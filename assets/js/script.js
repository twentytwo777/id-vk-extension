class idElement {
    constructor() {
        this.url = 'https://api.twentytwo777.fun/vk.id/';

        this.eventListener();
    };

    eventListener() {
        this.renderElement();
        document.querySelector('.show_idBTN') ? document.querySelector('.show_idBTN').onclick = this.requestID.bind(this) : false;
    };

    async requestID() {
        const currentPathname = location.pathname.replace(/[\\\/]/g, '');
        document.querySelector('.show_idBTN').textContent = 'Loading...';
        
        return await fetch(`${this.url}?id=${currentPathname}`).then(data => {
            if (data.status === 200) return data.json();
            throw new Error('Something went wrong');
        }).then(data => {
            document.querySelector('.show_idBTN').textContent = data.response[0]['id'];
            document.querySelector('.show_idBTN').style.cssText = `
                pointer-events: none !important; 
                user-select: all !important; 
                -webkit-user-select: all !important;
                cursor: text !important;
            `;
        }).catch(err => {
            document.querySelector('.show_idBTN').textContent = 'Error, check console for more info. [To try again, reload the page]';
            console.log(`${err.message}\nTo try again, reload the page`);
        });
    };

    renderElement() {
        const page_name = document.querySelector('.page_name'),
            html = `
                <div class="show_idBTN">
                    Show ID
                </div>`
            ;

        page_name ? page_name.insertAdjacentHTML('beforeend', html) : false;
    };
};

const ID = new idElement;
// fucking vk uses ajax request, but not redirects, bastards...
setInterval(_ => !document.querySelector('.show_idBTN') ? ID.eventListener() : false, 1000);