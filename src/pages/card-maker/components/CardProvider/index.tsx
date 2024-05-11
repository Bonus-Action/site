import { createContext, Dispatch, Key, ReactElement, useEffect, useReducer, useRef } from 'react';

import { Ability } from '@pages/card-maker/components/DynamicAbilities';

import { GenerateCardPdfData } from '../../../../../netlify/functions/card-maker-pdf/card-maker-pdf';
import { CardType } from '../../../../components/FlipCard';

import { CardAction, cardReducer, initialState, MIN_X, MIN_Y } from './cardReducer';

export const CardContext = createContext<CardContextType | null>(null);

interface IProps {
    children: ReactElement;
}

export type CardContextType = {
    abilities: Record<string, Ability>;
    title: GenerateCardPdfData['title'];
    image: string;
    onTabChange: (key: CardSide) => void;
    requiresAttunement: boolean;
    itemType: Key | null;
    rarity: Key | null;
    cardSide: CardSide;
    cardRef: React.RefObject<HTMLDivElement>;
    safeBox: SafeBox;
    cardType: CardType;
    dispatch: Dispatch<CardAction>;
};

export type CardSide = 'front' | 'back';
export type SafeBox = { maxX: number; maxY: number; minX: number; minY: number };

export type State = {
    abilities: Record<string, Ability>;
    title: GenerateCardPdfData['title'];
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
        dispatch({ type: 'SET_SAFE_BOX', payload: { safeBox } });
    }, []);

    const { abilities, title, image, rarity, itemType, requiresAttunement, cardSide, safeBox, cardType } = state;

    function onTabChange(key: CardSide) {
        if (key === 'front') {
            dispatch({ type: 'FLIP_TO_FRONT' });
        } else {
            dispatch({ type: 'FLIP_TO_BACK' });
        }
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
                requiresAttunement,
                itemType,
                rarity,
                safeBox,
                cardType,
                dispatch,
            }}
        >
            {children}
        </CardContext.Provider>
    );
}
