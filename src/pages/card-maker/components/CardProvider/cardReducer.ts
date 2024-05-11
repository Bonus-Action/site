import { Key } from 'react';

import { GenerateCardPdfData } from '../../../../../netlify/functions/card-maker-pdf/card-maker-pdf';
import { CardType } from '../../../../components/FlipCard';
import { Ability } from '../DynamicAbilities';

import { SafeBox, State } from '.';

export type CardAction =
    | { type: 'SET_ABILITIES'; payload: { abilities: Record<string, Ability> } }
    | { type: 'SET_TITLE'; payload: Partial<GenerateCardPdfData['title']> }
    | { type: 'SET_IMAGE'; payload: { image: string } }
    | { type: 'SET_RARITY'; payload: { rarity: Key | null } }
    | { type: 'SET_ITEM_TYPE'; payload: { itemType: Key | null } }
    | { type: 'SET_REQUIRES_ATTUNEMENT'; payload: { requiresAttunement: boolean } }
    | { type: 'FLIP_TO_FRONT' }
    | { type: 'FLIP_TO_BACK' }
    | { type: 'SET_SAFE_BOX'; payload: { safeBox: SafeBox } }
    | { type: 'SET_CARD_TYPE'; payload: { cardType: CardType } };

export const MIN_X = 20;
export const MIN_Y = 20;

export const initialState: State = {
    abilities: {},
    title: { text: '', x: 0, y: 0, width: 0, height: 0, fontSize: 24 },
    image: '',
    rarity: null,
    itemType: null,
    requiresAttunement: false,
    cardSide: 'front',
    safeBox: { maxX: 0, maxY: 0, minX: MIN_X, minY: MIN_Y },
    cardType: 'poker',
};

export function cardReducer(state: State, action: CardAction): State {
    switch (action.type) {
        case 'SET_ABILITIES':
        case 'SET_IMAGE':
        case 'SET_RARITY':
        case 'SET_ITEM_TYPE':
        case 'SET_REQUIRES_ATTUNEMENT':
        case 'SET_SAFE_BOX':
        case 'SET_CARD_TYPE':
            return { ...state, ...action.payload };
        case 'SET_TITLE':
            return { ...state, title: { ...state.title, ...action.payload } };
        case 'FLIP_TO_FRONT':
            return { ...state, cardSide: 'front' };
        case 'FLIP_TO_BACK':
            return { ...state, cardSide: 'back' };
        default:
            return state;
    }
}
