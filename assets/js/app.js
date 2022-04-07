class App {
    constructor() {
        this.Render();
        this.eventListeners();
    };

    eventListeners() {
        const showID = document.querySelector('.show_idBTN');
        if (showID) {
            (async _ => {
                const _fac = chrome.runtime.getURL('../assets/js/background/facInit.js');
                await import(_fac).then(Fac => {
                    const fac = new Fac.fac, _style = getComputedStyle(document.body).backgroundColor;      
                    fac.isDark(_style) ? showID.classList.add('dark') : showID.classList.remove('dark');
                });
    
                const getID = chrome.runtime.getURL('../assets/js/background/requests/getID.js');
                await import(getID).then(vkID => {
                    const classvkID = new vkID.getID, id = location.pathname.replace(/[\\\/]/g, '');
                    showID ? showID.onclick = _ => classvkID.request(id) : false; 
                });
            })();
        };
    };

    Render() {
        const page_name = document.querySelector('.wide_column .page_top .page_name'), html = `<div class="show_idBTN">Show ID</div>`;

        page_name ? page_name.insertAdjacentHTML('beforeend', html) : false;
    };
};

const _App = new App;
// fucking vk uses ajax request, but not redirects, bastards...
setInterval(_ => {
    const showID = document.querySelector('.show_idBTN');
    !showID ? _App.Render() : _App.eventListeners();
}, 1000);