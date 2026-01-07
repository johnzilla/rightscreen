const COLORS = [
    { id: 'black', name: 'Black', value: '#000000', textColor: '#ffffff' },
    { id: 'white', name: 'White', value: '#ffffff', textColor: '#000000' },
    { id: 'navy', name: 'Navy', value: '#1a1a4e', textColor: '#ffffff' },
    { id: 'red', name: 'Red', value: '#8b0000', textColor: '#ffffff' },
    { id: 'forest', name: 'Forest Green', value: '#1a3d1a', textColor: '#ffffff' },
    { id: 'orange', name: 'Orange', value: '#cc5500', textColor: '#ffffff' },
    { id: 'purple', name: 'Purple', value: '#4a1a6b', textColor: '#ffffff' },
    { id: 'gray', name: 'Gray', value: '#3a3a3a', textColor: '#ffffff' },
    { id: 'maroon', name: 'Maroon', value: '#5c1a1a', textColor: '#ffffff' },
    { id: 'teal', name: 'Teal', value: '#1a4a4a', textColor: '#ffffff' },
    { id: 'gold', name: 'Gold', value: '#8b7500', textColor: '#ffffff' },
    { id: 'slate', name: 'Slate', value: '#2f3640', textColor: '#ffffff' },
];

const GRADIENTS = [
    {
        id: 'dark',
        name: 'Dark',
        css: 'linear-gradient(180deg, #000000 0%, #2a2a2a 100%)',
        stops: [{ pos: 0, color: '#000000' }, { pos: 1, color: '#2a2a2a' }],
        textColor: '#ffffff'
    },
    {
        id: 'midnight',
        name: 'Midnight Blue',
        css: 'linear-gradient(180deg, #0a1628 0%, #1e3a5f 100%)',
        stops: [{ pos: 0, color: '#0a1628' }, { pos: 1, color: '#1e3a5f' }],
        textColor: '#ffffff'
    },
    {
        id: 'sunset',
        name: 'Sunset',
        css: 'linear-gradient(180deg, #4a1a6b 0%, #cc5500 100%)',
        stops: [{ pos: 0, color: '#4a1a6b' }, { pos: 1, color: '#cc5500' }],
        textColor: '#ffffff'
    },
    {
        id: 'forest-gradient',
        name: 'Forest',
        css: 'linear-gradient(180deg, #0d2818 0%, #2d5a3d 100%)',
        stops: [{ pos: 0, color: '#0d2818' }, { pos: 1, color: '#2d5a3d' }],
        textColor: '#ffffff'
    },
    {
        id: 'steel',
        name: 'Steel',
        css: 'linear-gradient(180deg, #1a1a1a 0%, #4a4a4a 50%, #2a2a2a 100%)',
        stops: [{ pos: 0, color: '#1a1a1a' }, { pos: 0.5, color: '#4a4a4a' }, { pos: 1, color: '#2a2a2a' }],
        textColor: '#ffffff'
    },
    {
        id: 'american',
        name: 'American',
        css: 'linear-gradient(180deg, #1a1a4e 0%, #4a1a1a 100%)',
        stops: [{ pos: 0, color: '#1a1a4e' }, { pos: 1, color: '#4a1a1a' }],
        textColor: '#ffffff'
    },
];

const TEXT_OPTIONS = [
    { id: 'no-consent', text: 'I Do Not Consent To A Search' },
    { id: 'owner-no-consent', text: 'Owner Does Not Consent To Search Or Seizure' },
    { id: '4th-protected', text: 'This Device Is Protected By The 4th Amendment' },
    { id: '5th-invoke', text: 'No Consent To Search - Invoke 5th Amendment Rights' },
];

const FONTS = [
    { id: 'sans', name: 'Sans-Serif', family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', weight: '700' },
    { id: 'serif', name: 'Serif', family: 'Georgia, "Times New Roman", Times, serif', weight: '700' },
    { id: 'impact', name: 'Impact', family: '"Arial Black", "Helvetica Bold", Arial, sans-serif', weight: '900' },
];

function getBackgroundById(id) {
    const color = COLORS.find(c => c.id === id);
    if (color) return { type: 'solid', ...color };

    const gradient = GRADIENTS.find(g => g.id === id);
    if (gradient) return { type: 'gradient', ...gradient };

    return null;
}
