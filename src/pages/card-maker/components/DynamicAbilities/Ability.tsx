import Input from '@components/Input';

import { Ability } from '.';

interface IProps {
    ability: Ability;
    onFocus: () => void;
    onChange: (ability: Ability) => void;
}

export default function DynamicAbility({ ability, onChange, onFocus }: IProps) {
    function onTitleChange(value: string) {
        const newAbility: Ability = { ...ability, title: value };
        onChange(newAbility);
    }

    function onDescriptionChange(value: string) {
        const newAbility: Ability = { ...ability, description: value };
        onChange(newAbility);
    }

    return ability ? (
        <div className="flex mb-4">
            <Input label="Title" value={ability.title} onFocus={onFocus} onChange={onTitleChange} className="mr-4" />
            <Input label="Description" value={ability.description} onFocus={onFocus} onChange={onDescriptionChange} />
        </div>
    ) : null;
}
