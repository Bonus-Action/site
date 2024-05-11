import { useContext } from 'react';

import { CardContext } from '../components/CardProvider';

export function useCardProvider() {
    const context = useContext(CardContext);

    if (!context) {
        throw new Error('useCardProvider must be used within a CardProvider');
    }

    return context;
}
