const anNouns = ['Artificer'];

export function getAttunementString(requiresAttunement: boolean, attunementClass: string) {
    if (!requiresAttunement) return;

    if (attunementClass && attunementClass !== '-') {
        const noun = anNouns.includes(attunementClass) ? 'an' : 'a';
        return `Requires attunement by ${noun} ${attunementClass}`;
    }

    return 'Requires attunement';
}
