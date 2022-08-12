class vkUser {
    async requestID(id, btn) {
        btn.textContent = 'Loading...';

        return await fetch(`https://api.twentytwo777.fun/vk.id/?id=${id}`).then(data => data.json()).then(data => {
            btn.textContent = data.response[0]['id'];
            btn.classList.add('clicked');
        }).catch(err => {
            btn.textContent = '⛔ Error, check console.';
            btn.classList.add('clicked');

            console.log(`❗ Something went wrong, please try again later. ❗\nReason: ${err.message}`);
        });
    };
};

export default vkUser;