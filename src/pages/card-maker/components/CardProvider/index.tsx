import { createContext, Key, ReactElement, useEffect, useReducer, useRef } from 'react';

import { Ability } from '@pages/card-maker/components/DynamicAbilities';

import { CardType } from '../../../../components/FlipCard';

import { cardReducer, initialState, MIN_X, MIN_Y } from './cardReducer';

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
    cardType: 'poker',
    changeCardType: () => {},
});

interface IProps {
    children: ReactElement;
}

export type CardContextType = {
    abilities: Record<string, Ability>;
    title: string;
    image: string;
    onTabChange: (key: CardSide) => void;
    setTitle: (value: string) => void;
    flipToFront: () => void;
    flipToBack: () => void;
    requiresAttunement: boolean;
    setRequiresAttunement: (value: boolean) => void;
    itemType: Key | null;
    setItemType: (value: Key | null) => void;
    setImage: (value: string) => void;
    rarity: Key | null;
    setRarity: (value: Key | null) => void;
    cardSide: CardSide;
    cardRef: React.RefObject<HTMLDivElement>;
    safeBox: SafeBox;
    cardType: CardType;
    changeCardType: (value: CardType) => void;
};

export type CardSide = 'front' | 'back';
export type SafeBox = { maxX: number; maxY: number; minX: number; minY: number };

export type State = {
    abilities: Record<string, Ability>;
    title: string;
    image: string;
    rarity: Key | null;
    itemType: Key | null;
    requiresAttunement: boolean;
    cardSide: CardSide;
    safeBox: SafeBox;
    cardType: CardType;
};

export default function CardProvider({ children }: IProps) {
    const [state, dispatch] = useReducer(cardReducer, initialState);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        const { width, height } = cardRef.current.getBoundingClientRect();
        const safeBox = { maxX: width - MIN_X, maxY: height - 10, minX: MIN_X, minY: MIN_Y };
        dispatch({ type: 'SET_SAFE_BOX', safeBox });
    }, []);

    const { abilities, title, image, rarity, itemType, requiresAttunement, cardSide, safeBox, cardType } = state;

    function onTabChange(key: CardSide) {
        if (key === 'front') {
            dispatch({ type: 'FLIP_TO_FRONT' });
        } else if (key === 'back') {
            dispatch({ type: 'FLIP_TO_BACK' });
        }
    }

    function setTitle(value: string) {
        dispatch({ type: 'SET_TITLE', title: value });
    }

    function setImage(value: string) {
        dispatch({ type: 'SET_IMAGE', image: value });
    }

    function setRarity(value: Key | null) {
        dispatch({ type: 'SET_RARITY', rarity: value });
    }

    function setItemType(value: Key | null) {
        dispatch({ type: 'SET_ITEM_TYPE', itemType: value });
    }

    function setRequiresAttunement(value: boolean) {
        dispatch({ type: 'SET_REQUIRES_ATTUNEMENT', requiresAttunement: value });
    }

    function flipToFront() {
        dispatch({ type: 'FLIP_TO_FRONT' });
    }

    function flipToBack() {
        dispatch({ type: 'FLIP_TO_BACK' });
    }

    function changeCardType(value: CardType) {
        dispatch({ type: 'SET_CARD_TYPE', cardType: value });
    }

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
                cardType,
                changeCardType,
            }}
        >
            {children}
        </CardContext.Provider>
    );
}
