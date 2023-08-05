import Input from '@components/Input';
import { Ability } from '.';
import { FormEvent } from 'react';

interface IProps {
    ability: Ability;
    onFocus: () => void;
    onChange: (ability: Ability) => void;
}

export default function DynamicAbility({ ability, onChange, onFocus }: IProps) {
    function onTitleChange(value: string) {
        const newAbility: Ability = { ...ability, title: value };
        console.log({ newAbility });
        onChange(newAbility);
    }

    function onDescriptionChange(value: string) {
        const newAbility: Ability = { ...ability, description: value };
        onChange(newAbility);
    }

    return (
        <div className="flex mb-4">
            <Input label="Title" value={ability.title} onFocus={onFocus} onChange={onTitleChange} className="mr-4" />
            <Input label="Description" value={ability.description} onFocus={onFocus} onChange={onDescriptionChange} />
        </div>
    );
}
