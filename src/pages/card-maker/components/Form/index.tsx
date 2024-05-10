import { useContext, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';

import { Button } from '@components/Button';
import Checkbox from '@components/Checkbox';
import FormGroup from '@components/FormGroup';
import Input from '@components/Input';
import Modal from '@components/Modal';
import Select from '@components/Select';
import DynamicAbilities from '@pages/card-maker/components/DynamicAbilities';
import ItemGrid from '@pages/card-maker/components/ItemGrid';

import { itemTypes, rarities } from '../../../../lib/cardItemTypes';
import { characterClasses } from '../../../../lib/classes';
import { classNames } from '../../../../lib/classNames';
import { CardContext } from '../CardProvider';

export default function CardForm() {
    const {
        onTabChange,
        setTitle,
        title,
        flipToBack,
        setRarity,
        setItemType,
        setRequiresAttunement,
        requiresAttunement,
    } = useContext(CardContext);
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

    return (
        <div className="flex-wrap">
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
                            <Input type="text" label="Title" onChange={setTitle} value={title} />
                        </FormGroup>

                        <FormGroup>
                            <Select
                                options={rarities.map((rarity) => ({ label: rarity, value: rarity }))}
                                label="Rarity"
                                placeholder="Select item rarity"
                                onChange={setRarity}
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
                                onChange={setItemType}
                            />
                        </FormGroup>

                        <FormGroup className="mb-0">
                            <Button
                                variant="primary-ghost"
                                size="small"
                                className="mt-3"
                                onClick={() => setIsImagePickerOpen((open) => !open)}
                            >
                                Pick image
                            </Button>
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Checkbox
                            label="Requires attunement"
                            onChange={setRequiresAttunement}
                            isSelected={requiresAttunement}
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
                        <DynamicAbilities onFocus={flipToBack} />
                    </FormGroup>
                </TabPanel>
            </Tabs>

            <Modal isOpen={isImagePickerOpen} onOpenChange={(isOpen) => setIsImagePickerOpen(isOpen)}>
                {({ close }) => <ItemGrid close={close} />}
            </Modal>
        </div>
    );
}
