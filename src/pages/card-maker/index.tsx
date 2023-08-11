import { useContext } from 'react';

import FlipCard from '@components/FlipCard';

import CardBack from './components/CardBack';
import CardFront from './components/CardFront';
import CardProvider, { CardContext } from './components/CardProvider';
import CardForm from './components/Form';

function CardMakerPageInner() {
    const { cardSide, cardRef } = useContext(CardContext);

    return (
        <main className="container mx-auto py-24">
            <h1>Make your own card</h1>

            <section className="flex">
                <div className="mr-8" ref={cardRef}>
                    <FlipCard front={<CardFront />} back={<CardBack />} cardSide={cardSide} />
                </div>
                <CardForm />
            </section>
        </main>
    );
}

export default function CardMakerPage() {
    return (
        <CardProvider>
            <CardMakerPageInner />
        </CardProvider>
    );
}
