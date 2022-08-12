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
                const colorDeterminant = new determinant.default, style = getComputedStyle(document.body);
    
                document.documentElement.style.cssText = `--vkIDBackground: ${style.backgroundColor}; --vkIDColor: ${style.color};`;
                colorDeterminant.isDark(style.backgroundColor) ? buttonID.classList.add('dark') : buttonID.classList.remove('dark');
            });
            
            await import(chrome.runtime.getURL('assets/js/background/vk/vkUser.js')).then(vk => {
                const vkUser = new vk.default, id = location.pathname.replace(/[\\\/]/g, '');
                buttonID.onclick = vkUser.requestID.bind(vkUser, id, buttonID); 
            });
        };
    };

    Render() {
        const pageDesktop = document.querySelector('#profile .wide_column .page_top .page_name'), 
            pageMobile = document.querySelector('.BasisProfile .owner_panel .pp_cont .op_header'),
            html = '<div class="buttonID">✍ Show ID</div>',
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