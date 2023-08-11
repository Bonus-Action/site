import { ReactNode } from 'react';
import { Dialog, Modal as ReactAriaModal } from 'react-aria-components';

interface IProps {
    children: (props: { close: () => void }) => ReactNode;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function Modal({ children, isOpen, onOpenChange }: IProps) {
    return (
        <ReactAriaModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={true}
            className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50 z-20"
        >
            <Dialog className="shadow-md rounded-md bg-slate-50 w-3/4 h-5/6 overflow-auto p-8">{children}</Dialog>
        </ReactAriaModal>
    );
}
