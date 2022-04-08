class fac {
    constructor() {
        this.r, this.g, this.b, this.hsp;
    };

    isDark(color) {
        if (color.match(/^rgb/)) {
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            (this.r = color[1]), (this.g = color[2]), (this.b = color[3]);
        } else {
            color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

            this.r = color >> 16;
            this.g = (color >> 8) & 255;
            this.b = color & 255;
        };

        this.hsp = Math.sqrt(0.299 * (this.r * this.r) + 0.587 * (this.g * this.g) + 0.114 * (this.b * this.b));
        return this.hsp > 127.5 ? false : true;
    };
};

export {fac};