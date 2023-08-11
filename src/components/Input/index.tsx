import { useRef } from 'react';
import { type AriaTextFieldProps, useTextField } from 'react-aria';

import Label from '@components/Label';

import { classNames } from '../../lib/classNames';

interface IProps extends AriaTextFieldProps {
    className?: string;
}

export default function Input(props: IProps) {
    const ref = useRef(null);
    const { label, errorMessage, className } = props;
    const { labelProps, inputProps, errorMessageProps } = useTextField(props, ref);

    return (
        <div className={classNames('flex flex-col w-60', className)}>
            <Label {...labelProps}>{label}</Label>
            <input
                {...inputProps}
                ref={ref}
                className="appearance-none border border-slate-200 rounded w-full px-3 py-2 text-gray-700"
            />

            {errorMessage ? (
                <div {...errorMessageProps} className="text-red-700">
                    {errorMessage}
                </div>
            ) : null}
        </div>
    );
}
