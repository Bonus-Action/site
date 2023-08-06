import Item, { ItemType } from './Item';

const items: Array<ItemType> = Array(200).fill({ imageUrl: '/img/card-maker/item.png', title: 'Item' });

export default function ItemGrid() {
    return (
        <section className="flex flex-wrap justify-between">
            {items.map((item) => (
                <Item item={item} />
            ))}
        </section>
    );
}
