import Image from 'next/image';

import Draggable from '../../../../components/Draggable';
import { useCardProvider } from '../../hooks/useCardProvider';

export function CardImage() {
    const { image, title, safeBox } = useCardProvider();

    return image ? (
        <Draggable {...safeBox} allowAxis={{ x: true, y: true }}>
            <Image
                src={image}
                alt={`Image for ${title.text}`}
                width={safeBox.maxX - safeBox.minX}
                height={safeBox.maxY - safeBox.minY}
            />
        </Draggable>
    ) : null;
}
