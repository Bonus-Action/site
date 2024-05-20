import Link from 'next/link';

import SocialButtons from '@components/SocialButtons';

export function Footer() {
    return (
        <footer className="flex bg-gray py-16 text-white mt-auto">
            <div className="container mx-auto flex">
                <div className="flex w-1/4 flex-col">
                    <p className="uppercase font-semibold text-md">More</p>
                    <ul className="leading-normal">
                        <li className="py-1 hover:text-slate-200">
                            <Link href="/open-game-license">Open Game License</Link>
                        </li>
                        <li className="py-1 hover:text-slate-200">
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li className="py-1 hover:text-slate-200">
                            <Link href="/terms-of-service">Terms Of Service</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex w-1/4 flex-col">
                    <p className="uppercase font-semibold text-m">Social</p>
                    <div className="py-1 ">
                        <SocialButtons color="white" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
