import answer from "/answer.json" assert {type: "json"};

class getID {
    async request(id, elemButton) {
        elemButton.textContent = answer.buttonText[0].Loading;

        return await fetch(`https://api.twentytwo777.fun/vk.id/?id=${id}`).then(data => data.json()).then(data => {
            elemButton.textContent = data.response[0]['id'];
            elemButton.classList.add('clicked');
        }).catch(err => {
            elemButton.textContent = answer.buttonText[0].Error;
            console.log(`${err.message}\n${answer.responseAnswers[0].statusErrorRecommendation}`);
        });
    };
};

export {getID};