import { ReactElement, useRef, useState } from 'react';
import { useMove } from 'react-aria';

import { classNames } from '../../lib/classNames';

interface IProps {
    children: ReactElement | Array<ReactElement | null>;
    initialPos?: { x?: number; y?: number };
    minX?: number;
    minY?: number;
    maxX?: number;
    maxY?: number;
    allowAxis?: { x?: boolean; y?: boolean };
    className?: string;
}

export default function Draggable({
    children,
    initialPos,
    minX = 0,
    minY = 0,
    allowAxis,
    maxX,
    maxY,
    className,
}: IProps) {
    const allowXAxisMovement = allowAxis?.x ?? true;
    const allowYAxisMovement = allowAxis?.y ?? true;
    const [currentPos, setCurrentPos] = useState({ x: initialPos?.x || 0, y: initialPos?.y || 0 });
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { moveProps } = useMove({
        onMove: (e) =>
            setCurrentPos((currentPos) => {
                let newX = allowXAxisMovement ? currentPos.x + e.deltaX : currentPos.x;
                let newY = allowYAxisMovement ? currentPos.y + e.deltaY : currentPos.y;
                const wrapperWidth = wrapperRef?.current?.clientWidth || 0;
                const wrapperHeight = wrapperRef?.current?.clientHeight || 0;

                if (newX < minX) {
                    newX = minX;
                } else if (maxX && newX > maxX - wrapperWidth) {
                    newX = maxX - wrapperWidth;
                }

                if (newY < minY) {
                    newY = minY;
                } else if (maxY && newY > maxY - wrapperHeight) {
                    newY = maxY - wrapperHeight;
                }

                return {
                    x: newX,
                    y: newY,
                };
            }),
    });

    return (
        <div
            {...moveProps}
            style={{ top: currentPos.y, left: currentPos.x }}
            ref={wrapperRef}
            className={classNames('absolute focus:outline-2 focus:outline-blue-600 cursor-move', className)}
            tabIndex={0}
        >
            {children}
        </div>
    );
}
