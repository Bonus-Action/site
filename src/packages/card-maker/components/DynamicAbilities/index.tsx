import { uuid } from 'uuidv4';

import { Button } from '@components/Button';

import useCardProvider from '../../hooks/useCardProvider';

import DynamicAbility from './Ability';

export type Ability = {
    id: string;
    title: string;
    description: string;
};

export default function DynamicAbilities() {
    const { dispatch, abilities } = useCardProvider();

    /**
     * Add a new ability to the card
     */
    function handleAddAbility() {
        const id = uuid();
        dispatch({ type: 'ADD_ABILITY', payload: { id } });
    }

    /**
     * Update an ability on the card
     */
    function onChange(ability: Ability) {
        dispatch({ type: 'UPDATE_ABILITY', payload: ability });
    }

    return (
        <section className="flex flex-col">
            <div className="flex-wrap">
                {Object.entries(abilities).map(([id, ability]) => (
                    <DynamicAbility key={id} ability={ability} onChange={onChange} />
                ))}
            </div>
            {Object.keys(abilities).length < 5 ? (
                <Button variant="primary-ghost" onClick={handleAddAbility} size="small" className="self-start">
                    Add ability
                </Button>
            ) : null}
        </section>
    );
}
