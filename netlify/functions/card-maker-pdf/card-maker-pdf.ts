import { jsPDF } from 'jspdf';

import { Handler } from '@netlify/functions';

import {
    backgroundImageBase64,
    norseFont,
    nunitoSansBoldFont,
    nunitoSansItalicFont,
    nunitoSansNormalFont,
} from './utils';

export type GenerateCardPdfData = {
    title: Title;
    card: { minX: number; minY: number };
    image: Image;
    subheader: Subheader;
    abilities: Array<Ability>;
};

type Ability = {
    id: string;
    title: string;
    description: string;
};

type Title = BoundingBox & { text: string; fontSize: number };
type Image = BoundingBox & { src: string; image: string; rotation: number };
type Subheader = BoundingBox & { rarity?: string; itemType?: string; attunement?: string; singleUse?: boolean };

type BoundingBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const marginX = 20;
const marginY = 20;

export const handler: Handler = async (event) => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'No body provided',
            }),
        };
    }

    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
        encryption: { userPermissions: ['print'] },
    });

    doc.addFileToVFS('Norse.ttf', norseFont);
    doc.addFont('Norse.ttf', 'Norse', 'Normal');

    doc.addFileToVFS('NunitoSansItalic.ttf', nunitoSansItalicFont);
    doc.addFont('NunitoSansItalic.ttf', 'NunitoSans', 'Italic');

    doc.addFileToVFS('NunitoSansNormal.ttf', nunitoSansNormalFont);
    doc.addFont('NunitoSansNormal.ttf', 'NunitoSans', 'Normal');

    doc.addFileToVFS('NunitoSansBold.ttf', nunitoSansBoldFont);
    doc.addFont('NunitoSansBold.ttf', 'NunitoSans', 'Bold');

    const cardWidth = 180; // pt TODO: get this from card config
    const cardHeight = 252; // pt TODO: get this from card config

    const title: Title = JSON.parse(event.body).title;
    const image: Image = JSON.parse(event.body).image;
    const subheader: Subheader = JSON.parse(event.body).subheader;
    const abilities: Array<Ability> = JSON.parse(event.body).abilities;

    const { minX, minY } = JSON.parse(event.body).card;

    for (let i = 0; i < 1; i++) {
        const pageParams = { doc, i, cardWidth, cardHeight, minX, minY };

        generateFront({ pageParams, title, image });
        generateBack({ pageParams, title, subheader, abilities });
    }

    const pdfData = doc.output('arraybuffer');

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${title.text}.pdf"`,
        },
        body: Buffer.from(pdfData).toString('base64'),
        isBase64Encoded: true,
    };
};

type GenerateFrontParams = {
    pageParams: PageParams;
    title: Title;
    image: Image;
};

/**
 * Generate the front of the card
 */
function generateFront({ pageParams, title, image }: GenerateFrontParams) {
    const { doc, i, cardWidth, cardHeight, minY } = pageParams;

    const cardX = marginX + i * cardWidth;

    doc.addImage(backgroundImageBase64, 'JPEG', cardX, marginY, cardWidth, cardHeight);

    const textX = pixelsToPoints(title.x) + cardX;
    const textY = pixelsToPoints(title.y) + marginY + pixelsToPoints(minY);

    doc.setFont('Norse', 'Normal');
    drawSmallCaps(doc, title.text, textX, textY, pixelsToPoints(title.fontSize));

    doc.addImage(
        image.image,
        'PNG',
        pixelsToPoints(image.x) + cardX,
        pixelsToPoints(image.y) + marginY,
        pixelsToPoints(image.width),
        pixelsToPoints(image.height),
        undefined,
        undefined,
        image.rotation,
    );
}

type GenerateBackParams = {
    pageParams: PageParams;
    title: Title;
    subheader: Subheader;
    abilities: Array<Ability>;
};

type PageParams = {
    doc: jsPDF;
    i: number;
    cardWidth: number;
    cardHeight: number;
    minX: number;
    minY: number;
};

/**
 * Generate the back of the card
 */
function generateBack({ pageParams, title, subheader, abilities }: GenerateBackParams) {
    const { doc, i, cardWidth, cardHeight, minY, minX } = pageParams;
    doc.addImage(backgroundImageBase64, 'JPEG', marginX + cardWidth, marginY, cardWidth, cardHeight);

    const cardX = marginX + (i + 1) * cardWidth;

    const textX = pixelsToPoints(title.x) + cardX;
    const textY = pixelsToPoints(title.y) + marginY + pixelsToPoints(minY);

    doc.setFont('Norse', 'Normal');
    drawSmallCaps(doc, title.text, textX, textY, pixelsToPoints(title.fontSize));

    const subheaderX = pixelsToPoints(subheader.x) + cardX;
    const subheaderY = pixelsToPoints(subheader.y) + pixelsToPoints(marginY) + pixelsToPoints(minY);

    doc.setFont('NunitoSans', 'Italic').setFontSize(pixelsToPoints(10));

    const { firstLine, secondLine } = generateSubheaderText(subheader);

    if (firstLine) {
        doc.text(firstLine, subheaderX, subheaderY, {
            maxWidth: pixelsToPoints(subheader.width),
        });
    }

    if (secondLine) {
        doc.text(secondLine, subheaderX, getLastCharCoordinates(doc, firstLine, subheaderX, subheaderY).y, {
            maxWidth: pixelsToPoints(subheader.width),
        });
    }

    const abilitiesX = cardX + pixelsToPoints(minX);
    const abilitiesY = subheaderY + pixelsToPoints(subheader.height) + 10;

    generateAbilities(doc, abilitiesX, abilitiesY, abilities);
}

/**
 * Because web works in pixels and pixel density works differently in print, we need to convert pixels to points
 * to get the correct size in the PDF.
 */
function pixelsToPoints(pixels: number) {
    return Math.round(pixels * 0.75);
}

/**
 * Generate the subheader text for the back of the card
 */
function generateSubheaderText(subheader: Subheader) {
    const text = { firstLine: '', secondLine: '' };

    if (subheader.rarity) text.firstLine += `${subheader.rarity} `;
    if (subheader.itemType) text.firstLine += `${subheader.itemType} `;
    if (subheader.attunement) text.secondLine += `\n${subheader.attunement}`;
    if (subheader.singleUse) text.secondLine += `\nSingle use`;

    return text;
}

/**
 * Generate the abilities for the back of the card
 */
function generateAbilities(doc: jsPDF, abilitiesX: number, abilitiesY: number, abilities: Array<Ability>) {
    let x = abilitiesX;
    let y = abilitiesY;

    // const lineHeight = 10; // Adjust this to provide space between lines
    const margin = 15; // Adjust this to provide space between abilities

    for (const ability of abilities) {
        const title = ability.title + '. ';
        doc.setFont('NunitoSans', 'Bold').setFontSize(pixelsToPoints(10));
        doc.text(title, x, y);

        const titleEndCoords = getLastCharCoordinates(doc, title, x, y);

        x = titleEndCoords.x;

        doc.setFont('NunitoSans', 'Normal').setFontSize(pixelsToPoints(10));
        doc.text(ability.description, x, y);

        const descriptionEndCoords = getLastCharCoordinates(doc, ability.description, x, y);
        x = abilitiesX;
        y = descriptionEndCoords.y + margin;
    }
}

/**
 * Draw 'faux' small caps text
 */
function drawSmallCaps(doc: jsPDF, text: string, x: number, y: number, fontSize: number, smallCapsScale = 0.7) {
    const words = text.split(' ');

    words.forEach((word) => {
        let currentX = x;
        let isUppercase = false;

        // Process each character in the word
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            isUppercase = char === char.toUpperCase() && char !== char.toLowerCase();

            if (isUppercase) {
                // Draw the character with a smaller font size for uppercase letters
                doc.setFontSize(fontSize * smallCapsScale);
            } else {
                // Draw the character with the normal font size for lowercase letters
                doc.setFontSize(fontSize * smallCapsScale);
            }

            // Get the width of the character
            const charWidth = doc.getTextWidth(char);

            // Draw the character
            doc.text(char, currentX, y);

            // Move the x position to the right for the next character
            currentX += charWidth;
        }

        // Add space between words
        x += doc.getTextWidth(word + ' ');
    });

    // Reset font size to original
    doc.setFontSize(fontSize);
}

/**
 * Get the coordinates of the last character in a string
 */
function getLastCharCoordinates(doc: jsPDF, text: string, startX: number, startY: number) {
    const textWidth = doc.getTextDimensions(text).w;
    return { x: startX + textWidth, y: startY };
}

// function drawCenteredText(doc: jsPDF, text: string, y: number, cardWidth: number) {
//     const textWidth = doc.getTextDimensions(text).w;
//     const x = (cardWidth - textWidth) / 2;
//     doc.text(text, x, y);
// }
