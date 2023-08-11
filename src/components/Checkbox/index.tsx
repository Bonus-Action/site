import { Fragment } from 'react';
import { Checkbox as ReactAriaCheckbox, CheckboxProps } from 'react-aria-components';

import { classNames } from '../../lib/classNames';

interface IProps extends CheckboxProps {
    label: string;
}

export default function Checkbox({ onChange, label, ...rest }: IProps) {
    return (
        <ReactAriaCheckbox {...rest} onChange={onChange} className="flex items-center">
            {({ isSelected, isFocused }) => (
                <Fragment>
                    <div
                        className={classNames(
                            'mr-2 flex items-center justify-center border border-slate-200 transition-all w-7 h-7 rounded-sm',
                            isFocused && 'outline outline-blue-600',
                        )}
                    >
                        <svg
                            viewBox="0 0 18 18"
                            aria-hidden="true"
                            className={classNames('w-5 h-5 fill-none', isSelected && 'stroke-primary stroke-2')}
                        >
                            <polyline points="1 9 7 14 15 4" />
                        </svg>
                    </div>
                    {label}
                </Fragment>
            )}
        </ReactAriaCheckbox>
    );
}
