import Label from '@components/Label';
import { useRef } from 'react';
import { useTextField, type AriaTextFieldProps } from 'react-aria';

export default function Input(props: AriaTextFieldProps) {
    const ref = useRef(null);
    const { label, errorMessage } = props;
    const { labelProps, inputProps, errorMessageProps } = useTextField(props, ref);

    return (
        <div className="flex flex-col w-60">
            <Label {...labelProps}>{label}</Label>
            <input
                {...inputProps}
                ref={ref}
                className="appearance-none border border-slate-200 rounded w-full px-3 py-2 text-gray-700 focus:outline-none focus:shadow-outline"
            />

            {errorMessage ? (
                <div {...errorMessageProps} className="text-red-700">
                    {errorMessage}
                </div>
            ) : null}
        </div>
    );
}
