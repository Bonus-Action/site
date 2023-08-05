import { ReactElement, useState } from 'react';
import { classNames } from '../../lib/classNames';
import Image from 'next/image';

interface IProps {
    flip?: boolean;
    flipOnHover?: boolean;
    front?: ReactElement;
    back?: ReactElement;
}

export default function FlipCard({ flip, flipOnHover, front, back }: IProps) {
    const flipDegrees = flip ? 0 : 180;

    return (
        <div style={{ height: 500 }} className="relative group w-96 [perspective:1000px]">
            <div
                className={classNames(
                    'h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d]',
                    flip && '[transform:rotateY(180deg)]',
                    flipOnHover && `group-hover:[transform:rotateY(${flipDegrees}deg)]`,
                )}
            >
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full shadow-md shadow-black/40 object-fill"
                        src="/img/card-maker/bg.png"
                        alt=""
                    />
                    {flip ? null : front}
                </div>
                <div className="absolute inset-0 h-full w-full px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex min-h-full flex-col items-center justify-center">{back}</div>
                </div>
            </div>
        </div>
    );
}
