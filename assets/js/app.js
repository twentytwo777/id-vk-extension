class App {
    constructor() {
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
        page_name ? page_name.insertAdjacentHTML('beforeend', html) : false;
    };
};

const _App = new App,
    checking = _ => {
        setInterval(_ => {
            const showID = document.querySelector('.show_idBTN');
            !showID ? _App.Render() : _App.eventListeners();
        });
    };
// fucking vk uses ajax request, but not redirects, bastards...
window.onload = checking;