class App {
    constructor() {
        this.init();
    };

    init() {
        this.Render();
        this.eventListeners();
    };

    async eventListeners() {
        const elemButton = document.querySelector('.show_idBTN');
        if (elemButton) {
            await import(chrome.runtime.getURL('../assets/js/background/facInit.js')).then(_Fac => {
                const fac = new _Fac.fac, 
                    _style = getComputedStyle(document.body);

                if (fac.isDark(_style.backgroundColor)) {
                    elemButton.classList.add('dark');
                    document.documentElement.style.cssText = `--isDark_bg: ${_style.backgroundColor}; --isDark_color: ${_style.color};`;
                } else {
                    elemButton.classList.remove('dark')
                };
            });
            
            await import(chrome.runtime.getURL('../assets/js/background/requests/getID.js')).then(vkID => {
                const classvkID = new vkID.getID, 
                    id = location.pathname.replace(/[\\\/]/g, '');

                elemButton ? elemButton.onclick = classvkID.request.bind(classvkID, id, elemButton) : false; 
            });
        };
    };

    async Render() {
        const pageNameDesktop = document.querySelector('#profile .wide_column .page_top .page_name'), 
            pageNameMobile = document.querySelector('.BasisProfile .owner_panel .pp_cont .op_header'),
            html = `<div class="show_idBTN">${
                await import(chrome.runtime.getURL('answer.json'), {
                    assert: {
                        type: "json"
                    }
                }).then(data => data.default.buttonText[0].Main)
            }</div>`;

        pageNameDesktop ? pageNameDesktop.insertAdjacentHTML('afterend', html) : false;
        pageNameMobile ? pageNameMobile.insertAdjacentHTML('afterend', html) : false;
    };
};

const _App = new App,
    observerApp = new MutationObserver(_App.init.bind(_App));

observerApp.observe(document.documentElement, {
    childList: true,
    subtree: true,
});