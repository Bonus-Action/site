import { Button, Item, ListBox, Popover, Select as ReactAriaSelect, SelectValue } from 'react-aria-components';
import Label from '@components/Label';

interface IProps {
    options: Array<{ label: string; value: string }>;
    label: string;
    placeholder?: string;
}

export default function Select({ options, label, placeholder }: IProps) {
    return (
        <div className="relative w-60">
            <ReactAriaSelect placeholder={placeholder}>
                <Label>{label}</Label>
                <Button className="flex text-base justify-between items-center w-full rounded-md border border-slate-200 bg-white px-3 py-2">
                    <SelectValue />
                    <span aria-hidden="true">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path
                                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </Button>
                <Popover
                    placement="bottom left"
                    className="w-60 rounded-md bg-white shadow-md border border-slate-100 z-1"
                >
                    <ListBox className="rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                        {options.map(({ label, value }) => (
                            <Item
                                key={value}
                                value={{ value }}
                                className="text-gray-900 select-none cursor-pointer relative py-2 pl-3 pr-9 focus:outline-none hover:bg-primary-light hover:text-white focus:bg-primary focus:text-white"
                            >
                                {label}
                            </Item>
                        ))}
                    </ListBox>
                </Popover>
            </ReactAriaSelect>
        </div>
    );
}
