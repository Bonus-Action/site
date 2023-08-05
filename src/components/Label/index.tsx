import { Label as ReactAriaLabel, LabelProps } from 'react-aria-components';

export default function Label({ children, ...restProps }: LabelProps) {
    return (
        <ReactAriaLabel {...restProps} className="block text-sm text-gray-700 font-bold mb-2">
            {children}
        </ReactAriaLabel>
    );
}
