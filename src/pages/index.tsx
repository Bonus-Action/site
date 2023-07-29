import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Header } from '@components/Header';
import Image from 'next/image';
import BAIcon from '@public/img/ba-icon.png';
import { buttonVariantMap, defaultButtonClassNames, sizeClassName } from '@components/Button';
import SocialButtons from '@components/SocialButtons';
import Link from 'next/link';
import { classNames } from '../lib/classNames';

export default function Home() {
    return (
        <main>
            <Header />
            <section className="flex py-24 bg-about bg-no-repeat bg-center bg-40" id="about">
                <div className="container mx-auto columns-2">
                    <div>
                        <h2 className="text-primary mb-4">Bonus Action</h2>
                        <p className="max-w-md">
                            Providing unique, accessible and usable homebrew content. Magic items, creatures and
                            character options, all written and illustrated to be easily used by gamemasters and players
                            alike. Bring something new and exciting to your table!
                        </p>
                        <section className="flex items-center">
                            <Link
                                className={classNames(
                                    buttonVariantMap['primary-ghost'],
                                    sizeClassName.small,
                                    defaultButtonClassNames,
                                    'mr-6',
                                )}
                                href="/about"
                            >
                                More about me
                            </Link>
                            <SocialButtons color="primary" />
                        </section>
                    </div>
                    <div className="flex justify-center">
                        <Image src={BAIcon} alt="Bonus Action logo icon" />
                    </div>
                </div>
            </section>
        </main>
    );
}
