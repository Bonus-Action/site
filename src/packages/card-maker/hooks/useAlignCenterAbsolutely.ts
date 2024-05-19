import { useEffect, useState } from 'react';

export type OnDependencyChangeParams = { x: number; y: number; width: number; height: number };

interface UseAlignCenterAbsolutelyProps {
    ref: React.MutableRefObject<HTMLDivElement | null>;
    dependencies: Array<unknown>;
    onDependencyChange?: (params: OnDependencyChangeParams) => void;
}

export default function useAlignCenterAbsolutely({
    ref,
    dependencies,
    onDependencyChange,
}: UseAlignCenterAbsolutelyProps) {
    const [width, setWidth] = useState(0);

    function handleDependencyChange() {
        if (!ref.current) return;

        const calcRegex = /calc\((.*?)\)/;
        const match = ref.current.style.left.match(calcRegex);

        const x = parseInt(match?.[1] || '0', 10);
        const y = parseInt(ref.current.style.top, 10);
        const width = parseInt(ref.current.style.width, 10);
        const height = ref.current.getBoundingClientRect().height;

        setWidth(ref.current.getBoundingClientRect().width);
        onDependencyChange?.({ x, y, width, height });
    }

    useEffect(() => {
        handleDependencyChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies]);

    return {
        width,
    };
}
