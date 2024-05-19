import { Fragment } from 'react';

import { Button } from '../../../../components/Button';

import Item, { ItemType } from './Item';

const items: Array<ItemType> = Array(200).fill({ imageUrl: '/img/card-maker/item.png', title: 'Item' });

interface IProps {
    close: () => void;
}

export default function ItemGrid({ close }: IProps) {
    return (
        <Fragment>
            <div className="relative">
                <Button
                    variant="primary-ghost"
                    type="button"
                    className="p-2 absolute top-0 right-0 z-10"
                    onClick={close}
                >
                    x
                </Button>
            </div>
            <section className="grid grid-cols-8 overflow-scroll">
                {items.map((item, i) => (
                    <Item key={i} item={item} onClose={close} />
                ))}
            </section>
        </Fragment>
    );
}
