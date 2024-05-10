import { ReactElement } from 'react';

import { CardSide } from '@pages/card-maker/components/CardProvider';

import { classNames } from '../../lib/classNames';

interface IProps {
    cardSide?: CardSide;
    front?: ReactElement;
    back?: ReactElement;
    type?: CardType;
}

export type CardType = 'poker' | 'tarot';

export default function FlipCard({ cardSide, front, back, type = 'poker' }: IProps) {
    return (
        <div
            className={classNames(
                'relative group [perspective:1000px]',
                // Size x 1.5
                type === 'tarot' ? `w-[105mm] h-[180mm]` : `w-[96mm] h-[133mm]`,
            )}
        >
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
