import Image from 'next/image';
import Link from 'next/link';

import { NavItem } from '@components/NavItem';
import LogoBlack from '@public/img/logo-black.png';

export function Navbar() {
    return (
        <nav className="p-4 fixed top-0 left-0 right-0 z-10 bg-white">
            <div className="container mx-auto flex justify-between">
                <Link href="/" className="max-w-logo">
                    <Image src={LogoBlack} alt="Logo" />
                </Link>

                <div className="flex">
                    <NavItem href="https://www.patreon.com/bonusaction" target="_blank">
                        <span>Patreon</span>
                    </NavItem>
                    <NavItem href="/about">
                        <span>About</span>
                    </NavItem>
                    <NavItem href="/contact">
                        <span>Contact</span>
                    </NavItem>
                </div>
            </div>
        </nav>
    );
}
