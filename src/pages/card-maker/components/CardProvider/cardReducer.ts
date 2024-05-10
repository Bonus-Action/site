import { Key } from 'react';

import { CardType } from '../../../../components/FlipCard';
import { Ability } from '../DynamicAbilities';

import { SafeBox, State } from '.';

export type CardAction =
    | { type: 'SET_ABILITIES'; abilities: Record<string, Ability> }
    | { type: 'SET_TITLE'; title: string }
    | { type: 'SET_IMAGE'; image: string }
    | { type: 'SET_RARITY'; rarity: Key | null }
    | { type: 'SET_ITEM_TYPE'; itemType: Key | null }
    | { type: 'SET_REQUIRES_ATTUNEMENT'; requiresAttunement: boolean }
    | { type: 'FLIP_TO_FRONT' }
    | { type: 'FLIP_TO_BACK' }
    | { type: 'SET_SAFE_BOX'; safeBox: SafeBox }
    | { type: 'SET_CARD_TYPE'; cardType: CardType };

export const MIN_X = 25;
export const MIN_Y = 30;

export const initialState: State = {
    abilities: {},
    title: '',
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
            return { ...state, abilities: action.abilities };
        case 'SET_TITLE':
            return { ...state, title: action.title };
        case 'SET_IMAGE':
            return { ...state, image: action.image };
        case 'SET_RARITY':
            return { ...state, rarity: action.rarity };
        case 'SET_ITEM_TYPE':
            return { ...state, itemType: action.itemType };
        case 'SET_REQUIRES_ATTUNEMENT':
            return { ...state, requiresAttunement: action.requiresAttunement };
        case 'FLIP_TO_FRONT':
            return { ...state, cardSide: 'front' };
        case 'FLIP_TO_BACK':
            return { ...state, cardSide: 'back' };
        case 'SET_SAFE_BOX':
            return { ...state, safeBox: action.safeBox };
        case 'SET_CARD_TYPE':
            return { ...state, cardType: action.cardType };
        default:
            return state;
    }
}
