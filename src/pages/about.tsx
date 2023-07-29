import SocialButtons from '@components/SocialButtons';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="container mx-auto py-24 flex">
            <section className="flex-1 pr-20">
                <h1 className="text-primary mb-4">Nice to meet you!</h1>
                <p>
                    My name is Tim de Roos, I'm a designer, illustrator and writer from the city of Zwolle in the
                    Netherlands. I make homebrew content for 5th edition Dungeons and Dragons.
                </p>
                <p>
                    I started Bonus Action in 2018 when I combined my artistic skills with my newfound love for Dungeons
                    and Dragons. I first started creating my own content for my home games and shared it with the
                    internet not long after. People seemed to enjoy my work and I've been creating and sharing fresh
                    homebrew content on a regular basis ever since.
                </p>
                <p>
                    I've always been super passionate about creating artwork and have been improving my skills in
                    digital art over the past few years. Thanks to Dungeons and Dragons I've discovered how much I enjoy
                    using my artistic skills in combination with creative writing and worldbuilding. It's my goal to
                    create unique, accessible and useful content for people to incorporate in their own games.
                </p>
                <p>
                    I take commissions for artwork and I love to work together with other people in the community.
                    <br />
                    Want to collaborate or commission me for something? Feel free to contact me!
                </p>
                <SocialButtons color="primary" />
            </section>
            <aside className="px-4">
                <figure className="rounded-full inline-flex overflow-hidden">
                    <Image src="/img/tim-300x300.jpeg" alt="Tim de Roos" width={300} height={300} />
                </figure>
            </aside>
        </main>
    );
}
