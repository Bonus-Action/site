import Link from 'next/link';

import facebookIcon from '@public/img/socials/facebook.svg';
import instagramIcon from '@public/img/socials/instagram.svg';
import patreonIcon from '@public/img/socials/patreon.svg';
import twitterIcon from '@public/img/socials/twitter.svg';

const socials = [
    { Icon: patreonIcon, url: 'https://www.patreon.com/bonusaction', name: 'Patreon' },
    { Icon: instagramIcon, url: 'https://www.instagram.com/bonus_action/', name: 'Instagram' },
    { Icon: twitterIcon, url: 'https://twitter.com/Bonus_Action', name: 'Twitter' },
    { Icon: facebookIcon, url: 'https://www.facebook.com/TheBonusAction/', name: 'Facebook' },
];

interface IProps {
    color: Color;
}

type Color = 'primary' | 'white';

const classNamesForColor: Record<Color, string> = {
    primary: 'fill-primary hover:fill-primary-light',
    white: 'fill-white hover:fill-slate-200',
};

/**
 * Social buttons component
 */
export default function SocialButtons({ color }: IProps) {
    const className = classNamesForColor[color];

    return (
        <section className="flex">
            {socials.map(({ Icon, url, name }) => (
                <Link
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener"
                    className={`${className} w-5 mr-6 transition-all ease-in-out`}
                >
                    <Icon />
                </Link>
            ))}
        </section>
    );
}
