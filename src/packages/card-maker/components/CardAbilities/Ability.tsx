import { useRef } from 'react';

import { Ability } from '../DynamicAbilities';

interface IProps {
    id: string;
    ability: Ability;
}

export default function CardAbilitiesAbility({ id, ability }: IProps) {
    const ref = useRef<HTMLParagraphElement>(null);

    return (
        <p ref={ref} key={id} className="mb-0 z-30">
            <span className="font-bold">{ability.title}. </span>
            <span>{ability.description}</span>
        </p>
    );
}
