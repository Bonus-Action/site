import { Fragment, useContext } from 'react';
import Image from 'next/image';

import Draggable from '@components/Draggable';

import CardBackground from '../CardBackground';
import { CardContext } from '../CardProvider';
import CardTitle from '../CardTitle';

export default function CardFront() {
    const { title, image, safeBox } = useContext(CardContext);

    return (
        <Fragment>
            <CardBackground />
            <CardTitle />
            {image ? (
                <Draggable maxX={safeBox.maxX} maxY={safeBox.maxY}>
                    <figure>
                        <Image src={image} alt={`Image for ${title}`} />
                    </figure>
                </Draggable>
            ) : null}
        </Fragment>
    );
}
