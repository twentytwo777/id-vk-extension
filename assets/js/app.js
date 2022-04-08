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
            await import(chrome.runtime.getURL('../assets/js/background/facInit.js'))
                .then(_Fac => {
                    const fac = new _Fac.fac, 
                        _style = getComputedStyle(document.body).backgroundColor;   

                    fac.isDark(_style) ? elemButton.classList.add('dark') : elemButton.classList.remove('dark');
                });
            
            await import(chrome.runtime.getURL('../assets/js/background/requests/getID.js'))
                .then(vkID => {
                    const classvkID = new vkID.getID, 
                        id = location.pathname.replace(/[\\\/]/g, '');

                    elemButton ? elemButton.onclick = _ => classvkID.request(id) : false; 
                });
        };
    };

    async Render() {
        const page_name = document.querySelector('.wide_column .page_top .page_name'), 
            html = `<div class="show_idBTN">${
                await import(chrome.runtime.getURL('../../answer.json'), {
                    assert: {
                        type: "json"
                    }
                }).then(data => data.default.buttonText[0].Main)
            }</div>`;

        if (page_name && !document.querySelector('.show_idBTN')) {
            page_name.insertAdjacentHTML('afterend', html);
        };
    };
};

const _App = new App,
    observerApp = new MutationObserver(_App.init.bind(_App));

observerApp.observe(document.documentElement, {
    childList: true,
    subtree: true,
});