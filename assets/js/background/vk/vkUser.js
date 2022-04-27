import answer from "/answer.json" assert {type: "json"};

class vkUser {
    async requestID(id, btn) {
        btn.textContent = answer.buttonText[0].Loading;

        return await fetch(`https://api.twentytwo777.fun/vk.id/?id=${id}`).then(data => data.json()).then(data => {
            btn.textContent = data.response[0]['id'];
            btn.classList.add('clicked');
        }).catch(err => {
            btn.textContent = answer.buttonText[0].Error;
            btn.classList.add('clicked');

            console.log(`${answer.responseAnswers[0].statusErrorRecommendation}\nReason: ${err.message}`);
        });
    };
};

export {vkUser};