class getID {
    async request(id) {
        const showID = document.querySelector('.show_idBTN');
        showID.textContent = 'Loading...';

        return await fetch(`https://api.twentytwo777.fun/vk.id/?id=${id}`).then(data => {
            if (data.status == 200) return data.json();
            throw new Error('Something went wrong');
        }).then(data => {
            showID.textContent = data.response[0]['id'];
            showID.style.cssText = `pointer-events: none !important; user-select: all !important; -webkit-user-select: all !important;`;
        }).catch(err => {
            showID.textContent = 'Error, check console for more info.';
            console.log(`${err.message}\nTo try again, reload the page`);
        });
    };
};

export {getID};