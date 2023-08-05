import { ReactElement } from 'react';

interface IProps {
    children: ReactElement;
}

export default function FormGroup({ children }: IProps) {
    return <div className="flex mb-4">{children}</div>;
}
