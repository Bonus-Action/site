import { MouseEvent } from 'react';
import Link from 'next/link';

import { buttonVariantMap, defaultButtonClassNames, sizeClassName } from '@components/Button';

import { classNames } from '../../lib/classNames';

export function Header() {
    /**
     * Scroll to block
     */
    function handleOnAboutClick(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const href = e.currentTarget.href;
        const id = href.replace(/.*\#/, '');
        const elem = document.getElementById(id);
        if (!elem) return;
        elem.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <header className="bg-header bg-cover bg-center bg-scroll h-screen relative">
            <div className="w-full h-full flex justify-center items-center bg-black/70"></div>
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-12 py-24">
                <h1 className="font-sans text-5xl text-white font-bold tracking-tight text-center font-variant-initial leading-tight fade-in-down">
                    An ever expanding vault of content for
                    <wbr /> the 5th edition of the world’s greatest roleplaying game.
                </h1>
                <div className="flex w-full mt-8 justify-center fade-in">
                    <Link
                        className={classNames(
                            buttonVariantMap.primary,
                            defaultButtonClassNames,
                            sizeClassName.normal,
                            'mr-2 flex items-center',
                        )}
                        href="https://www.patreon.com/bonusaction"
                        target="_blank"
                    >
                        Get 600+ items
                    </Link>
                    <Link
                        className={classNames(
                            buttonVariantMap.ghost,
                            defaultButtonClassNames,
                            sizeClassName.normal,
                            'flex items-center',
                        )}
                        href="#about"
                        onClick={handleOnAboutClick}
                    >
                        Find out more
                    </Link>
                </div>
            </div>
        </header>
    );
}
