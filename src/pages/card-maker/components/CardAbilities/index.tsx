import { useCardProvider } from '../../hooks/useCardProvider';

import { CardAbilitiesAbility } from './Ability';

export function CardAbilities() {
    const { abilities, safeBox, subheaderDimensions } = useCardProvider();

    return (
        <div
            className="absolute break-words card-text leading-tight"
            style={{
                top: subheaderDimensions.y + subheaderDimensions.height,
                left: safeBox.minX,
                width: safeBox.maxX - safeBox.minX,
            }}
        >
            {Object.entries(abilities).map(([id, ability]) =>
                ability.title ? <CardAbilitiesAbility key={id} id={id} ability={ability} /> : null,
            )}
        </div>
    );
}
