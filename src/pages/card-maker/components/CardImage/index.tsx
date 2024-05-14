import { Fragment, useState } from 'react';
import Image from 'next/image';
import { OnDragEnd, OnResizeEnd, OnRotateEnd } from 'react-moveable';

import { Movable } from '@components/Movable';

import { useCardProvider } from '../../hooks/useCardProvider';

export function CardImage() {
    const { image, title, safeBox, cardRef, dispatch } = useCardProvider();
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    console.log(image);
    function handleOnDragEnd(e: OnDragEnd) {
        if (!cardRef.current) return;

        const { top, left, width, height } = e.target.getBoundingClientRect();
        const { top: cardTop, left: cardLeft } = cardRef.current.getBoundingClientRect();
        const x = left - cardLeft;
        const y = top - cardTop;

        dispatch({ type: 'SET_IMAGE', payload: { x, y, width, height } });
    }

    /**
     * Handle the resize end event
     */
    function handleOnResizeEnd(e: OnResizeEnd) {
        const { width, height } = e.target.getBoundingClientRect();
        dispatch({ type: 'SET_IMAGE', payload: { width, height } });
    }

    /**
     * Handle the rotate end event
     */
    function handleOnRotateEnd(e: OnRotateEnd) {
        const style = window.getComputedStyle(e.target);
        const transform = style.getPropertyValue('transform');

        const match = transform.match(/matrix\((.*)\)/);

        if (!match || match.length < 2) return;

        const matrixValues = match[1].split(',').map(parseFloat);
        const rotation = Math.round(Math.atan2(matrixValues[1], matrixValues[0]) * (180 / Math.PI));

        dispatch({ type: 'SET_IMAGE', payload: { rotation } });
    }

    return image.image ? (
        <Fragment>
            <Movable
                draggable
                keepRatio
                resizable
                rotatable
                snappable
                isDisplaySnapDigit
                bounds={{ top: safeBox.minY, left: safeBox.minX, right: safeBox.maxX, bottom: safeBox.maxY }}
                target={containerRef}
                onDragEnd={handleOnDragEnd}
                onResizeEnd={handleOnResizeEnd}
                onRotateEnd={handleOnRotateEnd}
            />
            <figure className="p-4">
                <Image
                    className="relative"
                    src={image.image}
                    alt={`Image for ${title.text}`}
                    width={safeBox.maxX - safeBox.minX}
                    height={safeBox.maxY - safeBox.minY}
                    ref={setContainerRef}
                />
            </figure>
        </Fragment>
    ) : null;
}
