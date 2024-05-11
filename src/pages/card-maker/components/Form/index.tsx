import { FormEvent, useState } from 'react';
import { DialogTrigger, Tab, TabList, TabPanel, Tabs } from 'react-aria-components';

import { Button } from '@components/Button';
import Checkbox from '@components/Checkbox';
import FormGroup from '@components/FormGroup';
import Input from '@components/Input';
import Modal from '@components/Modal';
import Select from '@components/Select';
import DynamicAbilities from '@pages/card-maker/components/DynamicAbilities';
import ItemGrid from '@pages/card-maker/components/ItemGrid';

import { GenerateCardPdfData } from '../../../../../netlify/functions/card-maker-pdf/card-maker-pdf';
import { itemTypes, rarities } from '../../../../lib/cardItemTypes';
import { characterClasses } from '../../../../lib/classes';
import { classNames } from '../../../../lib/classNames';
import { useCardProvider } from '../../hooks/useCardProvider';
import { MIN_X, MIN_Y } from '../CardProvider/cardReducer';

export default function CardForm() {
    const { onTabChange, title, requiresAttunement, dispatch } = useCardProvider();
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

    async function handleCreateCard(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data: GenerateCardPdfData = {
            card: {
                minX: MIN_X,
                minY: MIN_Y,
            },
            title: {
                text: title.text,
                x: title.x,
                y: title.y,
                width: title.width,
                height: title.height,
                fontSize: title.fontSize,
            },
        };

        const blob = await fetch('/.netlify/functions/card-maker-pdf', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((res) => res.blob());

        const reader = new FileReader();
        reader.onload = () => {
            const link = document.createElement('a');
            link.href = reader.result as string;
            link.download = title.text;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        };

        reader.readAsDataURL(blob);
    }

    return (
        <form onSubmit={handleCreateCard} className="flex-wrap">
            <Tabs onSelectionChange={onTabChange}>
                <TabList aria-label="Card sides" className="flex mb-4">
                    <Tab
                        id="front"
                        className={({ isSelected }) =>
                            classNames('p-2 rounded-md', isSelected && 'bg-primary text-white')
                        }
                    >
                        Front
                    </Tab>
                    <Tab
                        id="back"
                        className={({ isSelected }) =>
                            classNames('p-2 rounded-md', isSelected && 'bg-primary text-white')
                        }
                    >
                        Back
                    </Tab>
                </TabList>
                <TabPanel id="front">
                    <div className="flex">
                        <FormGroup className="mr-4">
                            <Input
                                type="text"
                                label="Title"
                                onChange={(value) => dispatch({ type: 'SET_TITLE', payload: { text: value } })}
                                value={title.text}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Select
                                options={rarities.map((rarity) => ({ label: rarity, value: rarity }))}
                                label="Rarity"
                                placeholder="Select item rarity"
                                onChange={(value) => dispatch({ type: 'SET_RARITY', payload: { rarity: value } })}
                            />
                        </FormGroup>
                    </div>

                    <div className="flex items-center">
                        <FormGroup className="mr-4">
                            <Select
                                options={itemTypes.map((itemType) => ({
                                    label: itemType,
                                    value: itemType,
                                }))}
                                label="Item type"
                                placeholder="Select item type"
                                onChange={(value) => dispatch({ type: 'SET_ITEM_TYPE', payload: { itemType: value } })}
                            />
                        </FormGroup>

                        <FormGroup className="mb-0">
                            <DialogTrigger>
                                <Button
                                    variant="primary-ghost"
                                    size="small"
                                    className="mt-3"
                                    onClick={() => setIsImagePickerOpen((open) => !open)}
                                >
                                    Pick image
                                </Button>
                            </DialogTrigger>
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Checkbox
                            label="Requires attunement"
                            isSelected={requiresAttunement}
                            onChange={(value) =>
                                dispatch({ type: 'SET_REQUIRES_ATTUNEMENT', payload: { requiresAttunement: value } })
                            }
                        />
                    </FormGroup>
                    <FormGroup className="ml-4">
                        {requiresAttunement ? (
                            <Select
                                options={[
                                    { label: '-', value: '-' },
                                    ...characterClasses.map((characterClass) => ({
                                        label: characterClass,
                                        value: characterClass,
                                    })),
                                ]}
                                label="By a"
                                placeholder="Select class"
                            />
                        ) : (
                            <p>Custom</p>
                        )}
                    </FormGroup>
                </TabPanel>
                <TabPanel id="back">
                    <FormGroup>
                        <DynamicAbilities />
                    </FormGroup>
                </TabPanel>
                <Button variant="primary" type="submit">
                    Create card
                </Button>
            </Tabs>

            <Modal isOpen={isImagePickerOpen} onOpenChange={setIsImagePickerOpen}>
                {({ close }) => (
                    <ItemGrid
                        close={() => {
                            setIsImagePickerOpen(false);
                            close();
                        }}
                    />
                )}
            </Modal>
        </form>
    );
}
