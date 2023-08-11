import { ButtonHTMLAttributes } from 'react';

import { classNames } from '../../lib/classNames';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: Variant;
    size?: Size;
}

type Size = 'small' | 'normal';
type Variant = 'primary' | 'ghost' | 'primary-ghost';

export const buttonVariantMap: Record<Variant, string> = {
    primary: 'bg-primary hover:bg-primary-light text-white ',
    ghost: 'bg-transparent hover:bg-white text-white hover:text-black border-2 border-tranparent hover:border-white',
    'primary-ghost': 'bg-transparent hover:bg-primary hover:text-white text-primary border-2 border-primary',
};

export const sizeClassName: Record<Size, string> = {
    small: 'py-2 px-6 text-sm',
    normal: 'py-3 px-8 text-lg',
};

export const defaultButtonClassNames = 'font-bold transition ease-in-out';

export function Button({ type = 'button', children, variant, className, size = 'normal', onClick }: IProps) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={classNames(buttonVariantMap[variant], defaultButtonClassNames, sizeClassName[size], className)}
        >
            {children}
        </button>
    );
}
