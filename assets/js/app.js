class App {
    constructor() {
        this.init();
    };

    async init() {
        window.onload = await this.Render.bind(this);

        this.buttonID = document.querySelector('.buttonID');
        this.buttonID ? this.eventListeners() : false;
    };

    async eventListeners() {
        await import(chrome.runtime.getURL('assets/js/background/modules/colorDeterminant.js')).then(determinant => {
            const colorDeterminant = new determinant.colorDeterminant, style = getComputedStyle(document.body);

            document.documentElement.style.cssText = `--darkBackground: ${style.backgroundColor}; --darkColor: ${style.color};`;
            colorDeterminant.isDark(style.backgroundColor) ? this.buttonID.classList.add('dark') : this.buttonID.classList.remove('dark');
        });
        
        await import(chrome.runtime.getURL('assets/js/background/vk/vkUser.js')).then(vk => {
            const vkUser = new vk.vkUser, id = location.pathname.replace(/[\\\/]/g, '');
            this.buttonID.onclick = vkUser.requestID.bind(vkUser, id, this.buttonID); 
        });
    };

    async Render() {
        const pageDesktop = document.querySelector('#profile .wide_column .page_top .page_name'), 
            pageMobile = document.querySelector('.BasisProfile .owner_panel .pp_cont .op_header'),
            html = `<div class="buttonID">${
                await import(chrome.runtime.getURL('answer.json'), {
                    assert: {type: "json"}
                }).then(data => data.default.buttonText[0].Main)
            }</div>`,
            buttonID = document.querySelector('.buttonID');

        pageDesktop && !buttonID ? pageDesktop.insertAdjacentHTML('afterend', html) : false;
        pageMobile && !buttonID ? pageMobile.insertAdjacentHTML('afterend', html) : false;
    };
};

const app = new App(), observerApp = new MutationObserver(app.init.bind(app));
observerApp.observe(document.documentElement, {
    childList: true,
    subtree: true
});