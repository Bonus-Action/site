import CardBack from '@card-maker/components/CardBack';
import CardFront from '@card-maker/components/CardFront';
import CardProvider from '@card-maker/components/CardProvider';
import CardForm from '@card-maker/components/Form';
import useCardProvider from '@card-maker/hooks/useCardProvider';
import FlipCard from '@components/FlipCard';

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
