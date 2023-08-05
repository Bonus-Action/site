import { Button } from '@components/Button';
import Input from '@components/Input';
import { Fragment, useState } from 'react';

export type Ability = {
    title: string;
    description: string;
};

interface IProps {
    initialAbilities?: Array<Ability>;
    onFocus: any;
}

export default function DynamicAbilities({ initialAbilities, onFocus }: IProps) {
    const [abilities, setAbilities] = useState<Array<Ability>>(initialAbilities || []);
    console.log({ abilities });

    function handleAddAbility() {
        setAbilities((abilities) => [...abilities, { title: '', description: '' }]);
    }

    return (
        <div className="flex flex-wrap">
            {abilities.map((ability) => (
                <div className="flex mb-4">
                    <Input label="Title" value={ability.title} onFocus={onFocus} />
                    <Input label="Description" value={ability.description} onFocus={onFocus} />
                </div>
            ))}
            {/* <Button variant="primary-ghost" onClick={handleAddAbility}>
                Add ability
            </Button> */}
        </div>
    );
}
