import { ReactElement } from 'react';

import { CardSide } from '@pages/card-maker/components/CardProvider';

import { classNames } from '../../lib/classNames';

interface IProps {
    cardSide?: CardSide;
    front?: ReactElement;
    back?: ReactElement;
}

export default function FlipCard({ cardSide, front, back }: IProps) {
    return (
        <div style={{ height: 500 }} className="relative group w-96 [perspective:1000px]">
            <div
                className={classNames(
                    'h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d]',
                    cardSide === 'front' && 'motion-safe:[transform:rotateY(180deg)]',
                )}
            >
                <div className="absolute inset-0 [backface-visibility:hidden]">{front}</div>
                <div className="absolute inset-0 motion-safe:[transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="items-center justify-center">{back}</div>
                </div>
            </div>
        </div>
    );
}
