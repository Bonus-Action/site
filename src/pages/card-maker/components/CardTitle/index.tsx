import { useRef } from 'react';

import { OnDependencyChangeParams, useAlignCenterAbsolutely } from '../../hooks/useAlignCenterAbsolutely';
import { useCardProvider } from '../../hooks/useCardProvider';

export default function CardTitle() {
    const ref = useRef<HTMLDivElement>(null);
    const { safeBox, title, dispatch } = useCardProvider();
    const { minX, maxX, minY, maxY } = safeBox;
    const { width } = useAlignCenterAbsolutely({
        ref,
        dependencies: [title.text],
        onDependencyChange: handleDependencyChange,
    });

    function handleDependencyChange({ x, y, width, height }: OnDependencyChangeParams) {
        if (!ref.current) return;

        const style = window.getComputedStyle(ref.current);
        const fontSize = parseInt(style.getPropertyValue('font-size'), 10);

        dispatch({
            type: 'SET_TITLE',
            payload: {
                x,
                y,
                width,
                height,
                fontSize,
            },
        });
    }

    return (
        <p
            ref={ref}
            style={{
                maxHeight: maxY - minY,
                maxWidth: maxX - minX,
                top: minY,
                left: `calc((64mm / 2) - ${width / 2}px)`,
            }}
            className="text-neutral-800 -mb-1 fade-in-faster absolute whitespace-wrap break-words overflow-hidden leading-tight card-title"
        >
            {title.text}
        </p>
    );
}
