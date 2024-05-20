import { useRef, useState } from 'react';
import Image from 'next/image';

import useCardProvider from '../../hooks/useCardProvider';

interface IProps {
    item: ItemType;
    onClose: () => void;
    i: number;
}

export type ItemType = { imageUrl: string; title: string };

export default function Item({ i, item, onClose }: IProps) {
    const { dispatch, image } = useCardProvider();
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef<HTMLImageElement>(null);

    function handleOnClick() {
        dispatch({ type: 'SET_IMAGE', payload: { src: item.imageUrl } });
        onClose();
        imageToBase64();
    }

    function imageToBase64() {
        if (!ref.current) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        if (ctx) {
            ctx.canvas.width = image.width;
            ctx.canvas.height = image.height;
            ctx.drawImage(ref.current, 0, 0, image.width, image.height);
        }

        const base64Image = canvas.toDataURL('image/png');
        dispatch({ type: 'SET_IMAGE', payload: { image: base64Image } });
    }

    return (
        <div className="bg-white flex flex-col mb-2 mr-2 relative shadow-md">
            <button type="button" className="p-4" onClick={handleOnClick}>
                <Image
                    ref={ref}
                    src={item.imageUrl}
                    alt={item.title}
                    className="mb-2"
                    loading="lazy"
                    width={100}
                    height={100}
                    onLoad={() => setIsLoaded(true)}
                />
                {!isLoaded ? (
                    <p>Loading</p>
                ) : (
                    <p className="mb-0 text-sm">
                        {item.title} {i + 1}
                    </p>
                )}
            </button>
        </div>
    );
}
