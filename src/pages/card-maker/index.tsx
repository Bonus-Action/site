import FlipCard from '@components/FlipCard';

import CardBack from './components/CardBack';
import CardFront from './components/CardFront';
import CardProvider from './components/CardProvider';
import CardForm from './components/Form';
import { useCardProvider } from './hooks/useCardProvider';

function CardMakerPageInner() {
    const { cardSide, cardRef, cardType } = useCardProvider();

    return (
        <main className="container mx-auto py-24">
            <h1>Make your own card</h1>

            <section className="flex">
                <div className="mr-8" ref={cardRef}>
                    <FlipCard front={CardFront} back={CardBack} cardSide={cardSide} type={cardType} />
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
