import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactElement } from 'react';

interface IProps {
    children: ReactElement;
    target?: HTMLAttributeAnchorTarget;
    href: string;
}

export function NavItem({ children, target, href }: IProps) {
    return (
        <Link target={target} href={href} className="px-4 py-2 text-lg font-bold hover:text-primary">
            {children}
        </Link>
    );
}
