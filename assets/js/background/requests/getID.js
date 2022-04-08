import answer from "/answer.json" assert {type: "json"};

class getID {
    async request(id) {
        const showID = document.querySelector('.show_idBTN');
        showID.textContent = answer.buttonText[0].Loading;

        return await fetch(`https://api.twentytwo777.fun/vk.id/?id=${id}`).then(data => data.json())
            .then(data => {
                showID.textContent = data.response[0]['id'];
                showID.style.cssText = `
                    pointer-events: none !important; 
                    user-select: all !important; 
                    -webkit-user-select: all !important;
                `;
            })
            .catch(err => {
                showID.textContent = answer.buttonText[0].Error;
                console.log(`${err.message}\n${answer.responseAnswers[0].statusErrorRecommendation}`);
            });
    };
};

export {getID};