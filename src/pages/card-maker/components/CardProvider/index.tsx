import { createContext, Key, ReactElement, useEffect, useRef, useState } from 'react';

import { Ability } from '@pages/card-maker/components/DynamicAbilities';

import { itemTypes, rarities } from '../../../../lib/cardItemTypes';

const MIN_X = 25;
const MIN_Y = 30;

export const CardContext = createContext<CardContextType>({
    abilities: {},
    title: '',
    image: '',
    onTabChange: () => {},
    setTitle: () => {},
    flipToFront: () => {},
    flipToBack: () => {},
    requiresAttunement: false,
    setRequiresAttunement: () => {},
    itemType: null,
    setItemType: () => {},
    setImage: () => {},
    rarity: null,
    setRarity: () => {},
    cardSide: 'front',
    cardRef: { current: null },
    safeBox: { maxX: 0, maxY: 0, minX: MIN_X, minY: MIN_Y },
});

interface IProps {
    children: ReactElement;
}

export type CardContextType = {
    abilities: Record<string, Ability>;
    title: string;
    image: string;
    onTabChange: (key: Key) => void;
    setTitle: (value: string) => void;
    flipToFront: () => void;
    flipToBack: () => void;
    requiresAttunement: boolean;
    setRequiresAttunement: (value: boolean) => void;
    itemType: (typeof itemTypes)[number] | null;
    setItemType: (value: (typeof itemTypes)[number] | null) => void;
    setImage: (value: string) => void;
    rarity: (typeof rarities)[number] | null;
    setRarity: (value: (typeof rarities)[number] | null) => void;
    cardSide: CardSide;
    cardRef: React.RefObject<HTMLDivElement>;
    safeBox: SafeBox;
};

export type CardSide = 'front' | 'back';
export type SafeBox = { maxX: number; maxY: number; minX: number; minY: number };

export default function CardProvider({ children }: IProps) {
    const [abilities, setAbilities] = useState<Record<string, Ability>>({});
    const [title, setTitle] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [rarity, setRarity] = useState<(typeof rarities)[number] | null>(null);
    const [itemType, setItemType] = useState<(typeof itemTypes)[number] | null>(null);
    const [requiresAttunement, setRequiresAttunement] = useState<boolean>(false);
    const [cardSide, setCardSide] = useState<CardSide>('front');
    const cardRef = useRef<HTMLDivElement>(null);
    const [safeBox, setSafeBox] = useState<SafeBox>({ maxX: 0, maxY: 0, minX: MIN_X, minY: MIN_Y });
    console.log({ rarity });
    /**
     * Flip the card to the back side.
     */
    function flipToBack() {
        if (cardSide !== 'back') setCardSide('back');
    }

    /**
     * Flip the card to the front side.
     */
    function flipToFront() {
        if (cardSide !== 'front') setCardSide('front');
    }

    /**
     * Handle change of tab.
     */
    function onTabChange(key: Key) {
        if (key === 'general') {
            flipToFront();
        } else if (key === 'abilities') {
            flipToBack();
        }
    }

    /**
     * Get the safe box for the card.
     * Returns the minumum and maximum values for the x and y axis.
     */
    function getSafeBox() {
        if (!cardRef.current) return { maxX: 0, maxY: 0 };
        const { width, height } = cardRef.current.getBoundingClientRect();
        return setSafeBox({ maxX: width - MIN_X, maxY: height - 10, minX: MIN_X, minY: MIN_Y });
    }

    useEffect(() => {
        getSafeBox();
    }, []);

    return (
        <CardContext.Provider
            value={{
                cardRef,
                cardSide,
                abilities,
                title,
                image,
                onTabChange,
                setTitle,
                flipToFront,
                flipToBack,
                requiresAttunement,
                setRequiresAttunement,
                itemType,
                setItemType,
                setImage,
                rarity,
                setRarity,
                safeBox,
            }}
        >
            {children}
        </CardContext.Provider>
    );
}
