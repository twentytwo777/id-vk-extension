class App {
    constructor() {
        this.init();
    };

    init() {
        this.Render();
        this.eventListeners();
    };

    async eventListeners() {
        const buttonID = document.querySelector('.buttonID');

        if (buttonID) {
            await import(chrome.runtime.getURL('assets/js/background/modules/colorDeterminant.js')).then(determinant => {
                const colorDeterminant = new determinant.colorDeterminant, style = getComputedStyle(document.body);
    
                document.documentElement.style.cssText = `--vkIDBackground: ${style.backgroundColor}; --vkIDColor: ${style.color};`;
                colorDeterminant.isDark(style.backgroundColor) ? buttonID.classList.add('dark') : buttonID.classList.remove('dark');
            });
            
            await import(chrome.runtime.getURL('assets/js/background/vk/vkUser.js')).then(vk => {
                const vkUser = new vk.vkUser, id = location.pathname.replace(/[\\\/]/g, '');
                buttonID.onclick = vkUser.requestID.bind(vkUser, id, buttonID); 
            });
        };
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