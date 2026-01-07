class LockscreenRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    render(options) {
        const { device, background, text, font } = options;

        this.canvas.width = device.width;
        this.canvas.height = device.height;

        this.drawBackground(background);
        this.drawText(text, font, background.textColor, device);
    }

    drawBackground(background) {
        const { width, height } = this.canvas;

        if (background.type === 'solid') {
            this.ctx.fillStyle = background.value;
            this.ctx.fillRect(0, 0, width, height);
        } else if (background.type === 'gradient') {
            const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
            for (const stop of background.stops) {
                gradient.addColorStop(stop.pos, stop.color);
            }
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, width, height);
        }
    }

    drawText(text, font, textColor, device) {
        const { width, height } = this.canvas;
        const safeTop = device.safeZoneTop;
        const safeBottom = device.safeZoneBottom;
        const safeHeight = height - safeTop - safeBottom;

        const maxWidth = width * 0.85;
        const fontSize = this.calculateFontSize(text, font, maxWidth);

        this.ctx.fillStyle = textColor;
        this.ctx.font = `${font.weight} ${fontSize}px ${font.family}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        const lines = this.wrapText(text, maxWidth, fontSize, font);
        const lineHeight = fontSize * 1.3;
        const totalTextHeight = lines.length * lineHeight;

        const textY = safeTop + (safeHeight * 0.35) - (totalTextHeight / 2);

        lines.forEach((line, index) => {
            const y = textY + (index * lineHeight) + (lineHeight / 2);
            this.ctx.fillText(line, width / 2, y);
        });
    }

    calculateFontSize(text, font, maxWidth) {
        let fontSize = 120;
        const minFontSize = 40;

        while (fontSize > minFontSize) {
            this.ctx.font = `${font.weight} ${fontSize}px ${font.family}`;
            const lines = this.wrapText(text, maxWidth, fontSize, font);

            let fits = true;
            for (const line of lines) {
                const metrics = this.ctx.measureText(line);
                if (metrics.width > maxWidth) {
                    fits = false;
                    break;
                }
            }

            if (fits && lines.length <= 4) {
                return fontSize;
            }

            fontSize -= 4;
        }

        return minFontSize;
    }

    wrapText(text, maxWidth, fontSize, font) {
        this.ctx.font = `${font.weight} ${fontSize}px ${font.family}`;

        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = this.ctx.measureText(testLine);

            if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }

    downloadImage(deviceName) {
        const link = document.createElement('a');
        const filename = `rightscreen-${deviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
        link.download = filename;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }
}
