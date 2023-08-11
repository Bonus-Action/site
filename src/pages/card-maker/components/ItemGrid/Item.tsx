import { useState } from 'react';
import Image from 'next/image';

interface IProps {
    item: ItemType;
}

export type ItemType = { imageUrl: string; title: string };

export default function Item({ item }: IProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="bg-white flex flex-col mb-2 mr-2 relative shadow-md">
            <div className="p-4 cursor-pointer">
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    className="mb-2"
                    loading="lazy"
                    width={100}
                    height={100}
                    onLoad={() => setIsLoaded(true)}
                />
                {!isLoaded ? <p>Loading</p> : <p className="mb-0 text-sm">{item.title}</p>}
            </div>
        </div>
    );
}
