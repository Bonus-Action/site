import { Fragment } from 'react';

import CardBackground from '../CardBackground';
import { CardImage } from '../CardImage';
import CardTitle from '../CardTitle';

export default function CardFront() {
    return (
        <Fragment>
            <CardBackground />
            <CardTitle />
            <CardImage />
        </Fragment>
    );
}
