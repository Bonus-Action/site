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
                        id="general"
                        className={({ isSelected }) =>
                            classNames('p-2 rounded-md', isSelected && 'bg-primary text-white')
                        }
                    >
                        General info
                    </Tab>
                    <Tab
                        id="abilities"
                        className={({ isSelected }) =>
                            classNames('p-2 rounded-md', isSelected && 'bg-primary text-white')
                        }
                    >
                        Abilities
                    </Tab>
                </TabList>
                <TabPanel id="general">
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
                </TabPanel>
                <TabPanel id="abilities">
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
                </TabPanel>
            </Tabs>

            <Modal isOpen={isImagePickerOpen} onOpenChange={(isOpen) => setIsImagePickerOpen(isOpen)}>
                {({ close }) => <ItemGrid close={close} />}
            </Modal>
        </div>
    );
}
