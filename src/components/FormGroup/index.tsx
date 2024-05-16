import { PropsWithChildren } from 'react';

import { classNames } from '../../lib/classNames';

interface IProps {
    className?: string;
}

export default function FormGroup({ children, className }: PropsWithChildren<IProps>) {
    return <div className={classNames('flex flex-col md:flex-row mb-4 gap-4 ', className)}>{children}</div>;
}
