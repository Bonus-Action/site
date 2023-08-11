import { useState } from 'react';
import { uuid } from 'uuidv4';

import { Button } from '@components/Button';

import DynamicAbility from './Ability';

export type Ability = {
    id: string;
    title: string;
    description: string;
};

interface IProps {
    initialAbilities?: Record<string, Ability>;
    onFocus: () => void;
}

export default function DynamicAbilities({ initialAbilities, onFocus }: IProps) {
    const [abilities, setAbilities] = useState<Record<string, Ability>>(initialAbilities || {});

    function handleAddAbility() {
        const id = uuid();
        setAbilities((abilities) => ({ ...abilities, [id]: { id, title: '', description: '' } }));
    }

    function onChange(ability: Ability) {
        setAbilities((abilities) => ({
            ...abilities,
            [ability.id]: { ...ability },
        }));
    }

    return (
        <section className="flex flex-col">
            <div className="flex-wrap">
                {Object.entries(abilities).map(([id, ability]) => (
                    <DynamicAbility key={id} ability={ability} onFocus={onFocus} onChange={onChange} />
                ))}
            </div>
            <Button variant="primary-ghost" onClick={handleAddAbility} size="small" className="self-start">
                Add ability
            </Button>
        </section>
    );
}
