import { createContext, Dispatch, Key, ReactElement, useEffect, useReducer, useRef } from 'react';

import { GenerateCardPdfData } from '../../../../../netlify/functions/card-maker-pdf/card-maker-pdf';
import { CardType } from '../../../../components/FlipCard';
import { Ability } from '../DynamicAbilities';

import cardReducer, { CardAction, initialState, MIN_X, MIN_Y } from './cardReducer';

export const CardContext = createContext<CardContextType | null>(null);

interface IProps {
    children: ReactElement;
}

export interface IBoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type CardContextType = {
    abilities: Record<string, Ability>;
    title: GenerateCardPdfData['title'];
    image: { src: string; rotation: number; image: string } & IBoundingBox;
    onTabChange: (key: CardSide) => void;
    requiresAttunement: boolean;
    itemType: Key | null;
    rarity: Key | null;
    cardSide: CardSide;
    cardRef: React.RefObject<HTMLDivElement>;
    safeBox: SafeBox;
    cardType: CardType;
    dispatch: Dispatch<CardAction>;
    singleUse: boolean;
    attunementClass: string;
    subheaderDimensions: IBoundingBox;
};

export type CardSide = 'front' | 'back';
export type SafeBox = { maxX: number; maxY: number; minX: number; minY: number };

export type State = {
    abilities: Record<string, Ability>;
    title: GenerateCardPdfData['title'];
    image: { src: string; x: number; y: number; width: number; height: number; rotation: number; image: string };
    rarity: Key | null;
    itemType: Key | null;
    requiresAttunement: boolean;
    cardSide: CardSide;
    safeBox: SafeBox;
    cardType: CardType;
    singleUse: boolean;
    attunementClass: string;
    subheaderDimensions: IBoundingBox;
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

    function onTabChange(key: CardSide) {
        if (key === 'front') {
            dispatch({ type: 'FLIP_TO_FRONT' });
        } else {
            dispatch({ type: 'FLIP_TO_BACK' });
        }
    }

    // useEffect(() => {
    //     const urlParams = new URLSearchParams();
    //     urlParams.set('state', btoa(JSON.stringify(state)));
    //     router.replace(`${router.pathname}?${urlParams.toString()}`);
    // }, [state]);

    return (
        <CardContext.Provider
            value={{
                cardRef,
                onTabChange,
                dispatch,
                ...state,
            }}
        >
            {children}
        </CardContext.Provider>
    );
}
