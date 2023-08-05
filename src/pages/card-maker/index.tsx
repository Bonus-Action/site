import FlipCard from '@components/FlipCard';
import Input from '@components/Input';
import Select from '@components/Select';
import { FormEvent, Fragment, ReactElement, RefObject, useRef, useState } from 'react';
import { itemTypes, rarities } from '../../lib/cardItemTypes';
import FormGroup from '@components/FormGroup';
import DynamicAbilities, { Ability } from '@components/DynamicAbilities';
import { useMove } from 'react-aria';
import Checkbox from '@components/Checkbox';
import Draggable from '@components/Draggable';

interface IFrontProps {
    title: ReactElement;
    image?: string;
    cardRef: RefObject<HTMLDivElement>;
}

interface IBackProps {
    title: ReactElement;
    abilities: Record<string, Ability>;
    cardRef: RefObject<HTMLDivElement>;
}

function Front({ title, image, cardRef }: IFrontProps) {
    const maxX = cardRef?.current?.clientWidth || 28;
    return (
        <Fragment>
            {title}
            {image ? (
                <Draggable>
                    <figure>
                        <img src={image} />
                    </figure>
                </Draggable>
            ) : null}
        </Fragment>
    );
}

function Back({ title, abilities, cardRef }: IBackProps) {
    return (
        <div className="font-normal">
            {title}
            <div className="absolute top-16 left-8 right-0 w-10/12">
                {Object.entries(abilities).map(([id, ability]) => (
                    <Draggable allowAxis={{ x: false }}>
                        <p className="text-left font-normal text-sm text-neutral-800 small-caps">
                            <span className="font-bold">{ability.title}</span> <span>{ability.description}</span>
                        </p>
                    </Draggable>
                ))}
            </div>
        </div>
    );
}

function Title({ title }: { title: string }) {
    return (
        <Draggable>
            <p className="text-center font-headings text-2xl text-neutral-800 small-caps">{title}</p>
        </Draggable>
    );
}

export default function CardMakerPage() {
    const [flip, setFlip] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('/img/card-maker/item.png');
    const cardRef = useRef<HTMLDivElement>(null);
    const TitleComponent = <Title title={title} />;

    function flipToBack() {
        if (!flip) setFlip(true);
    }

    function flipToFront() {
        if (flip) setFlip(false);
    }

    return (
        <main className="container mx-auto py-24">
            <h1>Make your own card</h1>

            <section className="flex">
                <div className="mr-8" ref={cardRef}>
                    <FlipCard
                        flip={flip}
                        front={<Front title={TitleComponent} image={image} cardRef={cardRef} />}
                        back={
                            <Back
                                title={TitleComponent}
                                cardRef={cardRef}
                                abilities={{
                                    'd7c0cf26-41d6-47a3-ad23-0b8fb8bb1254': {
                                        id: 'd7c0cf26-41d6-47a3-ad23-0b8fb8bb1254',
                                        title: 'Healthy Diet',
                                        description:
                                            'As an action you can make this Cornucopia fill and overflow with enough vegetables and fruits to sustain 5 people for a whole day. This feature can be used only once per day.',
                                    },
                                    'b0b75a7e-2d17-4976-bbc9-a0bb4663c8fa': {
                                        id: 'b0b75a7e-2d17-4976-bbc9-a0bb4663c8fa',
                                        title: 'Bountiful Harvest.',
                                        description:
                                            'Once per year you can spend an action to also conjure a selection of pumpkin pies, cranberry sauce, sweet potato dishes and a large cooked turkey. 12 medium sized creatures may spend an hour to eat from this buffet. For the next 12 hours they have advantage on Wisdom and Intelligence saving throws and they are immune to being Frightened. Additionally they regain 4d6 hit points and their maximum hit points increase by the same amount for the duration.',
                                    },
                                }}
                            />
                        }
                    />
                </div>

                <div className="flex-wrap">
                    <div className="flex">
                        <FormGroup className="mr-4">
                            <Input type="text" label="Title" onChange={setTitle} onFocus={flipToFront} />
                        </FormGroup>

                        <FormGroup>
                            <Select options={rarities} label="Rarity" placeholder="Select item rarity" />
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Select options={itemTypes} label="Item type" placeholder="Select item type" />
                    </FormGroup>

                    <FormGroup>
                        <Checkbox label="Requires attunement" />
                    </FormGroup>

                    <FormGroup>
                        <DynamicAbilities
                            onFocus={flipToBack}
                            initialAbilities={{
                                'd7c0cf26-41d6-47a3-ad23-0b8fb8bb1254': {
                                    id: 'd7c0cf26-41d6-47a3-ad23-0b8fb8bb1254',
                                    title: 'Healthy Diet',
                                    description:
                                        'As an action you can make this Cornucopia fill and overflow with enough vegetables and fruits to sustain 5 people for a whole day. This feature can be used only once per day.',
                                },
                                'b0b75a7e-2d17-4976-bbc9-a0bb4663c8fa': {
                                    id: 'b0b75a7e-2d17-4976-bbc9-a0bb4663c8fa',
                                    title: 'Bountiful Harvest.',
                                    description:
                                        'Once per year you can spend an action to also conjure a selection of pumpkin pies, cranberry sauce, sweet potato dishes and a large cooked turkey. 12 medium sized creatures may spend an hour to eat from this buffet. For the next 12 hours they have advantage on Wisdom and Intelligence saving throws and they are immune to being Frightened. Additionally they regain 4d6 hit points and their maximum hit points increase by the same amount for the duration.',
                                },
                            }}
                        />
                    </FormGroup>
                </div>
            </section>
        </main>
    );
}
