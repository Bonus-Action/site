import { FormEvent, Key, useState } from 'react';
import { DialogTrigger, Tab, TabList, TabPanel, Tabs } from 'react-aria-components';

import { Button } from '@components/Button';
import Checkbox from '@components/Checkbox';
import FormGroup from '@components/FormGroup';
import Input from '@components/Input';
import Modal from '@components/Modal';
import Select from '@components/Select';

import { GenerateCardPdfData } from '../../../../../netlify/functions/card-maker-pdf/card-maker-pdf';
import { itemTypes, rarities } from '../../../../lib/cardItemTypes';
import { characterClasses } from '../../../../lib/classes';
import { classNames } from '../../../../lib/classNames';
import useCardProvider from '../../hooks/useCardProvider';
import { getAttunementString } from '../../lib/getAttunementString';
import DynamicAbilities from '../DynamicAbilities';
import ItemGrid from '../ItemGrid';

export default function CardForm() {
    const { onTabChange, title, requiresAttunement, dispatch, singleUse, ...state } = useCardProvider();
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

    async function handleCreateCard(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data: GenerateCardPdfData = {
            card: { minX: state.safeBox.minX, minY: state.safeBox.minY },
            image: state.image,
            subheader: {
                ...state.subheaderDimensions,
                singleUse,
                attunement: getAttunementString(requiresAttunement, state.attunementClass),
                itemType: (state.itemType as string) ?? undefined,
                rarity: (state.rarity as string) ?? undefined,
            },
            abilities: Object.values(state.abilities),
            title,
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
            <Tabs onSelectionChange={onTabChange as ((key: Key) => void) | undefined}>
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
                    </div>

                    <div className="flex items-center">
                        <FormGroup className="mb-0">
                            <DialogTrigger>
                                <Button
                                    variant="primary-ghost"
                                    size="small"
                                    className="mt-3"
                                    onClick={() => setIsImagePickerOpen((open) => !open)}
                                >
                                    Pick item image
                                </Button>
                            </DialogTrigger>

                            {/* <DialogTrigger>
                                <Button
                                    variant="primary-ghost"
                                    size="small"
                                    className="mt-3"
                                    onClick={() => setIsImagePickerOpen((open) => !open)}
                                >
                                    Pick item splash
                                </Button>
                            </DialogTrigger> */}
                        </FormGroup>
                    </div>
                </TabPanel>
                <TabPanel id="back">
                    <FormGroup>
                        <Select
                            options={rarities.map((rarity) => ({ label: rarity, value: rarity }))}
                            label="Rarity"
                            placeholder="Select item rarity"
                            onChange={(value) => dispatch({ type: 'SET_RARITY', payload: { rarity: value } })}
                            defaultValue={state.rarity as Key}
                        />
                        <Select
                            options={itemTypes.map((itemType) => ({
                                label: itemType,
                                value: itemType,
                            }))}
                            label="Item type"
                            placeholder="Select item type"
                            onChange={(value) => dispatch({ type: 'SET_ITEM_TYPE', payload: { itemType: value } })}
                            defaultValue={state.itemType as Key}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Checkbox
                            label="Requires attunement"
                            isSelected={requiresAttunement}
                            onChange={(value) =>
                                dispatch({ type: 'SET_REQUIRES_ATTUNEMENT', payload: { requiresAttunement: value } })
                            }
                        />
                        <Checkbox
                            label="Single use"
                            isSelected={singleUse}
                            onChange={(value) => dispatch({ type: 'SET_SINGLE_USE', payload: { singleUse: value } })}
                        />
                    </FormGroup>
                    <FormGroup className="ml-4">
                        {requiresAttunement ? (
                            <Select
                                label="By a"
                                placeholder="Select class"
                                defaultValue={state.attunementClass}
                                onChange={(value) =>
                                    dispatch({ type: 'SET_ATTUNEMENT_CLASS', payload: { attunementClass: value } })
                                }
                                options={[
                                    { label: '-', value: '-' },
                                    ...characterClasses.map((characterClass) => ({
                                        label: characterClass,
                                        value: characterClass,
                                    })),
                                ]}
                            />
                        ) : null}
                    </FormGroup>

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
