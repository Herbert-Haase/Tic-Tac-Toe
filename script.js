const gameboard = (() => {
    let value = 0;
    const move = () => {
            value++;
            return value;
    }
    const field = () =>{
        return document.querySelector("[data-field]");
    }
    return {move, field};
})();

const players = (name) => {
    const win = () => {
        const declareWin = document.querySelector(".declareWin");
        declareWin.textContent = `${name} won this match.`;
    }
    return {name, win};
}

const startNewGame = (() => {

    const inputName1 = document.querySelector('[placeholder="Player Name 1"]');
    const inputName2 = document.querySelector('[placeholder="Player Name 2"]');
    const playerNames = [];

    const errorCheck = () => {

      const _errorInput = () => {
        const error1 = document.querySelector(".errorone");
        const error2 = document.querySelector(".errortwo");
        error1.textContent = "";
        error2.textContent = "";

        if(!inputName1.textContent) error1.textContent = "Player Name 1 is missing";
        if(!inputName2.textContent) error2.textContent = "Player Name 2 is missing";
        if(inputName1.textContent && inputName2.textContent) return true;
    }

    if(!_errorInput()) return;

    playerNames.push(players(inputName1.textContent));
    playerNames.push(players(inputName2.textContent));
    
}

    return {errorCheck, };
})();



