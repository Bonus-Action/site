import { useEffect, useRef, useState } from 'react';

import { useCardProvider } from '../../hooks/useCardProvider';

export default function CardTitle() {
    const ref = useRef<HTMLDivElement>(null);
    const { safeBox, title, dispatch } = useCardProvider();
    const { minX, maxX, minY, maxY } = safeBox;
    const [width, setWidth] = useState(0);

    function handleTitleChange() {
        if (!ref.current) return;

        const style = window.getComputedStyle(ref.current, null);
        const fontSize = parseFloat(style.getPropertyValue('font-size'));

        const calcRegex = /calc\((.*?)\)/;
        const match = ref.current.style.left.match(calcRegex);

        const x = parseInt(match?.[1] || '0', 10);
        const y = parseInt(ref.current.style.top, 10);
        const width = parseInt(ref.current.style.width, 10);
        const height = ref.current.getBoundingClientRect().height;

        setWidth(ref.current.getBoundingClientRect().width);

        dispatch({ type: 'SET_TITLE', payload: { x, y, width, height, fontSize } });
    }

    useEffect(() => {
        handleTitleChange();
    }, [title.text]);

    return (
        <p
            ref={ref}
            style={{
                maxHeight: maxY - minY,
                maxWidth: maxX - minX,
                top: minY,
                left: `calc((64mm / 2) - ${width / 2}px)`,
            }}
            className="text-center font-headings text-xl text-neutral-800 small-caps -mb-1 fade-in-faster absolute whitespace-wrap break-words overflow-hidden small-caps"
        >
            {title.text}
        </p>
    );
}
