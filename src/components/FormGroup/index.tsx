import { ReactElement } from 'react';

import { classNames } from '../../lib/classNames';

interface IProps {
    children: ReactElement;
    className?: string;
}

export default function FormGroup({ children, className }: IProps) {
    return <div className={classNames('flex mb-4', className)}>{children}</div>;
}
