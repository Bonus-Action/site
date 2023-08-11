import Item, { ItemType } from './Item';

const items: Array<ItemType> = Array(200).fill({ imageUrl: '/img/card-maker/item.png', title: 'Item' });

interface IProps {
    close: () => void;
}

export default function ItemGrid({ close }: IProps) {
    return (
        <section className="flex flex-wrap justify-between">
            <span onClick={close}></span>
            {items.map((item) => (
                <Item key={item.title} item={item} />
            ))}
        </section>
    );
}
