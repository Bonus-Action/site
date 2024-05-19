import { ReactElement } from 'react';

import { classNames } from '../../lib/classNames';
import { CardSide } from '../../packages/card-maker/components/CardProvider';

interface IProps {
    cardSide?: CardSide;
    front?: () => ReactElement;
    back?: () => ReactElement;
    type?: CardType;
}

export type CardType = 'poker' | 'tarot';

export default function FlipCard({ cardSide, front: Front, back: Back, type = 'poker' }: IProps) {
    return (
        <div
            className={classNames(
                'relative group [perspective:1000px]',
                type === 'tarot' ? `w-[70mm] h-[120mm]` : `w-[64mm] h-[89mm]`,
            )}
        >
            <div
                className={classNames(
                    'h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d]',
                    cardSide === 'back' && 'motion-safe:[transform:rotateY(180deg)]',
                )}
            >
                <div className="absolute inset-0 [backface-visibility:hidden]">{Front ? <Front /> : null}</div>
                <div className="absolute inset-0 motion-safe:[transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="items-center justify-center">{Back ? <Back /> : null}</div>
                </div>
            </div>
        </div>
    );
}
