import React from 'react';
import Moveable, { MoveableProps, OnBound, OnDrag, OnResize, OnRotate } from 'react-moveable';

import { classNames } from '../../lib/classNames';

import styles from './Movable.module.css';

interface IProps extends MoveableProps {
    className?: string;
}

export function Movable({ onDrag, onResize, onBound, onRotate, className, ...moveableProps }: IProps) {
    /**
     * Handle the drag event
     */
    function handleOnDrag(e: OnDrag) {
        e.target.style.transform = e.transform;
        onDrag?.(e);
    }

    /**
     * Handle the resize event
     */
    function handleOnResize(e: OnResize) {
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.drag.transform;
        onResize?.(e);
    }

    /**
     * Handle the bound event.
     * This event is triggered when the target is moved outside of the bounds.
     */
    function handleOnBound(e: OnBound) {
        onBound?.(e);
    }

    /**
     * Handle the rotate event
     */
    function handleOnRotate(e: OnRotate) {
        e.target.style.transform = e.transform;
        onRotate?.(e);
    }

    return (
        <Moveable
            {...moveableProps}
            className={classNames(styles.base, className)}
            onDrag={handleOnDrag}
            onResize={handleOnResize}
            onBound={handleOnBound}
            onRotate={handleOnRotate}
        />
    );
}
