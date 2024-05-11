import { useState } from 'react';
import Image from 'next/image';

import { useCardProvider } from '../../hooks/useCardProvider';

interface IProps {
    item: ItemType;
    onClose: () => void;
}

export type ItemType = { imageUrl: string; title: string };

export default function Item({ item, onClose }: IProps) {
    const { dispatch } = useCardProvider();
    const [isLoaded, setIsLoaded] = useState(false);

    function handleOnClick() {
        dispatch({ type: 'SET_IMAGE', payload: { image: item.imageUrl } });
        onClose();
    }

    return (
        <div className="bg-white flex flex-col mb-2 mr-2 relative shadow-md">
            <button type="button" className="p-4" onClick={handleOnClick}>
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
            </button>
        </div>
    );
}
