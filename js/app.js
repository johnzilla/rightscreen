document.addEventListener('DOMContentLoaded', () => {
    const app = new RightScreenApp();
    app.init();
});

class RightScreenApp {
    constructor() {
        this.canvas = document.getElementById('preview-canvas');
        this.renderer = new LockscreenRenderer(this.canvas);

        this.deviceSelect = document.getElementById('device-select');
        this.colorSwatches = document.getElementById('color-swatches');
        this.gradientSwatches = document.getElementById('gradient-swatches');
        this.textSelect = document.getElementById('text-select');
        this.fontOptions = document.getElementById('font-options');
        this.downloadBtn = document.getElementById('download-btn');
        this.shareAppBtn = document.getElementById('share-app-btn');
        this.shareImageBtn = document.getElementById('share-image-btn');

        this.appUrl = window.location.href.split('?')[0];

        this.state = {
            deviceId: 'iphone-15-pro',
            backgroundId: 'black',
            textId: 'no-consent',
            fontId: 'sans'
        };
    }

    init() {
        this.populateDeviceSelect();
        this.populateColorSwatches();
        this.populateGradientSwatches();
        this.populateTextSelect();
        this.populateFontOptions();
        this.bindEvents();
        this.loadState();
        this.render();
    }

    populateDeviceSelect() {
        for (const [groupId, group] of Object.entries(DEVICES)) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.label;

            for (const device of group.devices) {
                const option = document.createElement('option');
                option.value = device.id;
                option.textContent = `${device.name} (${device.width}x${device.height})`;
                optgroup.appendChild(option);
            }

            this.deviceSelect.appendChild(optgroup);
        }

        this.deviceSelect.value = this.state.deviceId;
    }

    populateColorSwatches() {
        for (const color of COLORS) {
            const swatch = document.createElement('button');
            swatch.className = 'swatch';
            swatch.dataset.id = color.id;
            swatch.style.backgroundColor = color.value;
            swatch.title = color.name;
            swatch.setAttribute('aria-label', color.name);

            if (color.id === this.state.backgroundId) {
                swatch.classList.add('selected');
            }

            this.colorSwatches.appendChild(swatch);
        }
    }

    populateGradientSwatches() {
        for (const gradient of GRADIENTS) {
            const swatch = document.createElement('button');
            swatch.className = 'swatch';
            swatch.dataset.id = gradient.id;
            swatch.style.background = gradient.css;
            swatch.title = gradient.name;
            swatch.setAttribute('aria-label', gradient.name);

            if (gradient.id === this.state.backgroundId) {
                swatch.classList.add('selected');
            }

            this.gradientSwatches.appendChild(swatch);
        }
    }

    populateTextSelect() {
        for (const textOption of TEXT_OPTIONS) {
            const option = document.createElement('option');
            option.value = textOption.id;
            option.textContent = textOption.text;
            this.textSelect.appendChild(option);
        }

        this.textSelect.value = this.state.textId;
    }

    populateFontOptions() {
        for (const font of FONTS) {
            const label = document.createElement('label');
            label.className = 'font-option';
            if (font.id === this.state.fontId) {
                label.classList.add('selected');
            }

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'font';
            input.value = font.id;
            input.checked = font.id === this.state.fontId;

            const nameSpan = document.createElement('span');
            nameSpan.className = 'font-name';
            nameSpan.textContent = font.name;

            const previewSpan = document.createElement('span');
            previewSpan.className = 'font-preview';
            previewSpan.style.fontFamily = font.family;
            previewSpan.style.fontWeight = font.weight;
            previewSpan.textContent = 'Aa';

            label.appendChild(input);
            label.appendChild(nameSpan);
            label.appendChild(previewSpan);
            this.fontOptions.appendChild(label);
        }
    }

    bindEvents() {
        this.deviceSelect.addEventListener('change', (e) => {
            this.state.deviceId = e.target.value;
            this.saveState();
            this.render();
        });

        this.colorSwatches.addEventListener('click', (e) => {
            const swatch = e.target.closest('.swatch');
            if (swatch) {
                this.selectBackground(swatch.dataset.id);
            }
        });

        this.gradientSwatches.addEventListener('click', (e) => {
            const swatch = e.target.closest('.swatch');
            if (swatch) {
                this.selectBackground(swatch.dataset.id);
            }
        });

        this.textSelect.addEventListener('change', (e) => {
            this.state.textId = e.target.value;
            this.saveState();
            this.render();
        });

        this.fontOptions.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                this.state.fontId = e.target.value;
                this.updateFontSelection();
                this.saveState();
                this.render();
            }
        });

        this.downloadBtn.addEventListener('click', () => {
            const device = getDeviceById(this.state.deviceId);
            this.renderer.downloadImage(device.name);
        });

        this.shareAppBtn.addEventListener('click', () => {
            this.shareApp();
        });

        this.shareImageBtn.addEventListener('click', () => {
            this.shareImage();
        });
    }

    selectBackground(id) {
        this.state.backgroundId = id;

        document.querySelectorAll('.swatch').forEach(s => s.classList.remove('selected'));

        const selectedSwatch = document.querySelector(`.swatch[data-id="${id}"]`);
        if (selectedSwatch) {
            selectedSwatch.classList.add('selected');
        }

        this.saveState();
        this.render();
    }

    updateFontSelection() {
        document.querySelectorAll('.font-option').forEach(opt => {
            const input = opt.querySelector('input');
            opt.classList.toggle('selected', input.checked);
        });
    }

    render() {
        const device = getDeviceById(this.state.deviceId);
        const background = getBackgroundById(this.state.backgroundId);
        const textOption = TEXT_OPTIONS.find(t => t.id === this.state.textId);
        const font = FONTS.find(f => f.id === this.state.fontId);

        if (!device || !background || !textOption || !font) {
            console.error('Missing render data');
            return;
        }

        this.renderer.render({
            device,
            background,
            text: textOption.text,
            font
        });
    }

    shareApp() {
        const text = 'Assert your 4th Amendment rights with a custom lockscreen';
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.appUrl)}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
    }

    async shareImage() {
        const device = getDeviceById(this.state.deviceId);
        const filename = `rightscreen-${device.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;

        try {
            const blob = await new Promise(resolve => this.canvas.toBlob(resolve, 'image/png'));
            const file = new File([blob], filename, { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'RightScreen',
                    text: 'My 4th Amendment lockscreen'
                });
            } else {
                this.shareImageFallback();
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                this.shareImageFallback();
            }
        }
    }

    shareImageFallback() {
        const device = getDeviceById(this.state.deviceId);
        this.renderer.downloadImage(device.name);
        alert('Image downloaded! Open X/Twitter to share it with your post.');
    }

    saveState() {
        try {
            localStorage.setItem('rightscreen-state', JSON.stringify(this.state));
        } catch (e) {
            // localStorage not available
        }
    }

    loadState() {
        try {
            const saved = localStorage.getItem('rightscreen-state');
            if (saved) {
                const parsed = JSON.parse(saved);

                if (getDeviceById(parsed.deviceId)) {
                    this.state.deviceId = parsed.deviceId;
                    this.deviceSelect.value = parsed.deviceId;
                }

                if (getBackgroundById(parsed.backgroundId)) {
                    this.state.backgroundId = parsed.backgroundId;
                    this.selectBackground(parsed.backgroundId);
                }

                if (TEXT_OPTIONS.find(t => t.id === parsed.textId)) {
                    this.state.textId = parsed.textId;
                    this.textSelect.value = parsed.textId;
                }

                if (FONTS.find(f => f.id === parsed.fontId)) {
                    this.state.fontId = parsed.fontId;
                    document.querySelector(`input[name="font"][value="${parsed.fontId}"]`).checked = true;
                    this.updateFontSelection();
                }
            }
        } catch (e) {
            // localStorage not available or invalid data
        }
    }
}
