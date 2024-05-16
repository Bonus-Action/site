import { Key } from 'react';

import { GenerateCardPdfData } from '../../../../../netlify/functions/card-maker-pdf/card-maker-pdf';
import { CardType } from '../../../../components/FlipCard';
import { Ability } from '../DynamicAbilities';

import { IBoundingBox, SafeBox, State } from '.';

export type CardAction =
    | { type: 'SET_TITLE'; payload: Partial<GenerateCardPdfData['title']> }
    | {
          type: 'SET_IMAGE';
          payload: Partial<{ src: string; image: string; rotation: number } & IBoundingBox>;
      }
    | { type: 'SET_RARITY'; payload: { rarity: Key } }
    | { type: 'SET_ITEM_TYPE'; payload: { itemType: Key } }
    | { type: 'SET_REQUIRES_ATTUNEMENT'; payload: { requiresAttunement: boolean } }
    | { type: 'FLIP_TO_FRONT' }
    | { type: 'FLIP_TO_BACK' }
    | { type: 'SET_SAFE_BOX'; payload: { safeBox: SafeBox } }
    | { type: 'SET_CARD_TYPE'; payload: { cardType: CardType } }
    | { type: 'SET_SINGLE_USE'; payload: { singleUse: boolean } }
    | { type: 'ADD_ABILITY'; payload: { id: string } }
    | { type: 'UPDATE_ABILITY'; payload: Ability }
    | { type: 'SET_ATTUNEMENT_CLASS'; payload: { attunementClass: Key } }
    | { type: 'SET_SUB_HEADER_DIMENSIONS'; payload: IBoundingBox };

export const MIN_X = 20;
export const MIN_Y = 20;

export const initialState: State = {
    abilities: {},
    title: { text: '', x: 0, y: 0, width: 0, height: 0, fontSize: 24 },
    image: { image: '', x: 0, y: 0, width: 0, height: 0, rotation: 0, src: '' },
    rarity: null,
    itemType: null,
    requiresAttunement: false,
    singleUse: false,
    cardSide: 'front',
    safeBox: { maxX: 0, maxY: 0, minX: MIN_X, minY: MIN_Y },
    cardType: 'poker',
    attunementClass: '',
    subheaderDimensions: { x: 0, y: 0, width: 0, height: 0 },
};

export function cardReducer(state: State, action: CardAction): State {
    switch (action.type) {
        case 'SET_RARITY':
        case 'SET_ITEM_TYPE':
        case 'SET_SAFE_BOX':
        case 'SET_CARD_TYPE':
            return { ...state, ...action.payload };
        case 'SET_TITLE':
            return { ...state, title: { ...state.title, ...action.payload } };
        case 'FLIP_TO_FRONT':
            return { ...state, cardSide: 'front' };
        case 'FLIP_TO_BACK':
            return { ...state, cardSide: 'back' };
        case 'SET_IMAGE':
            return { ...state, image: { ...state.image, ...action.payload } };
        case 'ADD_ABILITY':
            return {
                ...state,
                abilities: {
                    ...state.abilities,
                    [action.payload.id]: { title: '', description: '', id: action.payload.id },
                },
            };
        case 'UPDATE_ABILITY':
            return {
                ...state,
                abilities: { ...state.abilities, [action.payload.id]: action.payload },
            };
        case 'SET_ATTUNEMENT_CLASS':
            return { ...state, attunementClass: action.payload.attunementClass as string };
        case 'SET_REQUIRES_ATTUNEMENT':
            return {
                ...state,
                requiresAttunement: action.payload.requiresAttunement,
                singleUse: false,
                attunementClass:
                    !action.payload.requiresAttunement && state.attunementClass ? '' : state.attunementClass,
            };
        case 'SET_SINGLE_USE':
            return { ...state, singleUse: action.payload.singleUse, requiresAttunement: false, attunementClass: '' };
        case 'SET_SUB_HEADER_DIMENSIONS':
            return { ...state, subheaderDimensions: action.payload };
        default:
            return state;
    }
}
