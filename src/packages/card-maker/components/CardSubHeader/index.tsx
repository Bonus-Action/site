import { useRef } from 'react';

import useAlignCenterAbsolutely, { OnDependencyChangeParams } from '../../hooks/useAlignCenterAbsolutely';
import useCardProvider from '../../hooks/useCardProvider';
import { getAttunementString } from '../../lib/getAttunementString';

export default function CardSubHeader() {
    const ref = useRef<HTMLDivElement>(null);
    const { requiresAttunement, singleUse, title, safeBox, attunementClass, itemType, rarity, dispatch } =
        useCardProvider();
    const { minX, minY, maxX, maxY } = safeBox;
    const { width } = useAlignCenterAbsolutely({
        ref,
        dependencies: [singleUse, requiresAttunement, attunementClass, itemType, rarity],
        onDependencyChange: handleDependencyChange,
    });

    function handleDependencyChange({ x, y, width, height }: OnDependencyChangeParams) {
        if (!ref.current) return;

        console.log({
            x,
            y,
            width,
            height,
        });

        dispatch({
            type: 'SET_SUB_HEADER_DIMENSIONS',
            payload: {
                x,
                y,
                width,
                height,
            },
        });
    }

    return (
        <div
            ref={ref}
            className="absolute card-subtitle break-words mb-0 text-center leading-tight"
            style={{
                maxHeight: maxY - minY,
                maxWidth: maxX - minX,
                top: title.y + title.height,
                left: `calc((64mm / 2) - ${width / 2}px)`,
            }}
        >
            {rarity ? <span>{rarity} </span> : null}
            {itemType ? <span>{itemType}</span> : null}
            <p className="mb-0">
                {requiresAttunement ? <span>{getAttunementString(requiresAttunement, attunementClass)}</span> : null}
                {singleUse ? <span>Single Use</span> : null}
            </p>
        </div>
    );
}
