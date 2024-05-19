import Image from 'next/image';

export default function CardBackground() {
    return (
        <Image
            priority
            fill
            className="h-full w-full shadow-md shadow-black/40 object-fill"
            src="/img/card-maker/bg.png"
            alt="Background image"
        />
    );
}
