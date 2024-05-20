import useCardProvider from '../../hooks/useCardProvider';

import CardAbilitiesAbility from './Ability';

export default function CardAbilities() {
    const { abilities, safeBox, subheaderDimensions } = useCardProvider();

    return (
        <div
            className="absolute break-words card-text leading-tight flex flex-col gap-1"
            style={{
                top: subheaderDimensions.y + subheaderDimensions.height + 10,
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
