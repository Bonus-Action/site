import { Fragment, useContext } from 'react';

import { CardContext } from '../CardProvider';

export default function CardTitle() {
    const { safeBox, title, requiresAttunement, itemType, cardSide } = useContext(CardContext);
    const { minX, maxX, minY } = safeBox;

    return (
        <div
            style={{ width: maxX - minX, maxWidth: maxX - minX, top: minY, left: minX, right: maxX }}
            className="absolute overflow-hidden whitespace-wrap"
        >
            <p className="text-center font-headings text-2xl text-neutral-800 small-caps -mb-1 fade-in-faster">
                {title}
            </p>
            {cardSide === 'back' ? (
                <Fragment>
                    <p className="text-center font-body text-sm text-neutral-800 fade-in-faster">
                        {itemType}

                        {requiresAttunement ? <span className="inline-block ml-1">(Requires attunement)</span> : null}
                    </p>
                </Fragment>
            ) : null}
        </div>
    );
}
