import FlipCard from '@components/FlipCard';
import Input from '@components/Input';
import Select from '@components/Select';
import { FormEvent, Fragment, RefObject, useRef, useState } from 'react';
import { itemTypes } from '../lib/cardItemTypes';
import FormGroup from '@components/FormGroup';
import DynamicAbilities, { Ability } from '@components/DynamicAbilities';
import { useMove } from 'react-aria';

interface IFrontProps {
    title: string;
    image?: string;
    cardRef: RefObject<HTMLDivElement>;
}

interface IBackProps {
    title: string;
    abilities: Array<Ability>;
    cardRef: RefObject<HTMLDivElement>;
}

function Front({ title, image, cardRef }: IFrontProps) {
    const titleRef = useRef<HTMLParagraphElement>(null);
    const [titlePos, setTitlePos] = useState({ x: 170, y: 26 });
    const { moveProps } = useMove({
        onMove: (e) =>
            setTitlePos((currentPos) => {
                let newX = currentPos.x + e.deltaX;
                let newY = currentPos.y + e.deltaY;
                const titleWidth = titleRef?.current?.clientWidth || 0;
                const titleHeight = titleRef?.current?.clientHeight || 0;

                if (newX < 0) {
                    newX = 0;
                } else if (cardRef.current && newX > cardRef.current.clientWidth - titleWidth) {
                    newX = cardRef.current.clientWidth - titleWidth;
                }

                if (newY < 0) {
                    newY = 0;
                } else if (cardRef.current && newY > cardRef.current.clientHeight - titleHeight) {
                    newY = cardRef.current.clientHeight - titleHeight;
                }

                return {
                    x: newX,
                    y: newY,
                };
            }),
    });

    function onClick() {
        console.log(titleRef.current);
        titleRef.current?.focus();
    }

    return (
        <Fragment>
            <p
                {...moveProps}
                ref={titleRef}
                onClick={onClick}
                tabIndex={0}
                style={{ top: titlePos.y, left: titlePos.x }}
                className="absolute text-center inline font-headings text-2xl text-neutral-800 small-caps"
            >
                {title}
            </p>
            {image ? (
                <figure className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src={image} alt={title} />
                </figure>
            ) : null}
        </Fragment>
    );
}

function Back({ title, abilities, cardRef }: IBackProps) {
    const titleRef = useRef<HTMLParagraphElement>(null);

    return (
        <div className="font-normal">
            <p
                ref={titleRef}
                className="absolute top-6 text-center left-8 right-0 w-10/12 font-headings text-2xl text-neutral-800 small-caps"
            >
                {title}
            </p>

            <div className="absolute top-16 left-8 right-0 w-10/12">
                {abilities.map((ability, i) => (
                    <p className={`text-left font-normal text-sm text-neutral-800 small-caps`}>
                        <span className="font-bold">{ability.title}</span> <span>{ability.description}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}

export default function CardMakerPage() {
    const [flip, setFlip] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('/img/card-maker/item.png');
    const cardRef = useRef<HTMLDivElement>(null);

    function flipCard() {
        if (!flip) setFlip(true);
    }

    function returnCard() {
        if (flip) setFlip(false);
    }

    return (
        <main className="container mx-auto py-24 flex">
            <div className="mr-8" ref={cardRef}>
                <FlipCard
                    flip={flip}
                    front={<Front title={title} image={image} cardRef={cardRef} />}
                    back={
                        <Back
                            title={title}
                            cardRef={cardRef}
                            abilities={[
                                {
                                    title: 'Healthy Diet.',
                                    description:
                                        'As an action you can make this Cornucopia fill and overflow with enough vegetables and fruits to sustain 5 people for a whole day. This feature can be used only once per day.',
                                },
                                {
                                    title: 'Bountiful Harvest.',
                                    description:
                                        'Once per year you can spend an action to also conjure a selection of pumpkin pies, cranberry sauce, sweet potato dishes and a large cooked turkey. 12 medium sized creatures may spend an hour to eat from this buffet. For the next 12 hours they have advantage on Wisdom and Intelligence saving throws and they are immune to being Frightened. Additionally they regain 4d6 hit points and their maximum hit points increase by the same amount for the duration.',
                                },
                            ]}
                        />
                    }
                />
            </div>

            <div className="flex-wrap">
                <FormGroup>
                    <Input type="text" label="Title" onChange={setTitle} onFocus={returnCard} />
                </FormGroup>

                <FormGroup>
                    <Select options={itemTypes} label="Item type" placeholder="Select item type" />
                </FormGroup>

                <FormGroup>
                    <DynamicAbilities
                        onFocus={flipCard}
                        initialAbilities={[
                            {
                                title: 'Healthy Diet',
                                description:
                                    'As an action you can make this Cornucopia fill and overflow with enough vegetables and fruits to sustain 5 people for a whole day. This feature can be used only once per day.',
                            },
                            {
                                title: 'Bountiful Harvest.',
                                description:
                                    'Once per year you can spend an action to also conjure a selection of pumpkin pies, cranberry sauce, sweet potato dishes and a large cooked turkey. 12 medium sized creatures may spend an hour to eat from this buffet. For the next 12 hours they have advantage on Wisdom and Intelligence saving throws and they are immune to being Frightened. Additionally they regain 4d6 hit points and their maximum hit points increase by the same amount for the duration.',
                            },
                        ]}
                    />
                </FormGroup>
            </div>
        </main>
    );
}
