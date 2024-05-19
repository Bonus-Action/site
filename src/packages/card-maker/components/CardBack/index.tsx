import { Fragment } from 'react';

import CardAbilities from '../CardAbilities';
import CardBackground from '../CardBackground';
import CardSubHeader from '../CardSubHeader';
import CardTitle from '../CardTitle';

export default function CardBack() {
    return (
        <Fragment>
            <CardBackground />
            <CardTitle />
            <CardSubHeader />
            <CardAbilities />
        </Fragment>
    );
}
