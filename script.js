const gameBoard = (() => {
    let value = 0;
    const _switching = () => {
            value++;
            return value;
    }
    const move = () => {
        return _switching() % 2 === 0;
    }
    const field = () =>{
        return document.querySelectorAll("[data-field]");
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
    playerNames = [];

    const _errorInput = () => {
        const error1 = document.querySelector(".errorone");
        const error2 = document.querySelector(".errortwo");
        error1.textContent = "";
        error2.textContent = "";

        if(inputName1.value === "") error1.textContent = "Player Name 1 is missing";
        if(inputName2.value === "") error2.textContent = "Player Name 2 is missing";
        if(inputName1.value === "" && inputName2.value === "") return true;
    }

    const _putPlayerNamesTogether= () => {
        playerNames.pop();
        playerNames.pop();
        playerNames.push(players(inputName1.value));
        playerNames.push(players(inputName2.value));
    }

    const _start = () => {

        const fields = gameBoard.field();
        fields.forEach(field => {
            field.style.color = "red";
            field.textContent = "";
            field.removeEventListener('click', makeAMove, {once:true});
            field.addEventListener('click', makeAMove, {once:true});
        });

    }

    const errorCheck = () => {

    if(_errorInput()) return;

    _start()
    _putPlayerNamesTogether();
}
    
    return {errorCheck, playerNames};
})();

function makeAMove() {
    const move = gameBoard.move();
    _colorOs(move,this);
    this.textContent = transcribe(move);

    let field = this.getAttribute("data-field");
    field = parseInt(field);
    displaController.declareEnd(move, field);

    function transcribe(XO) {
        return XO? "O":"X";
    }

    function _colorOs(move,ele) {
        if(move) {
            ele.style.color = "#0284c7";
        }
    }
}

(()=>{
    const button = document.querySelector("button");
    button.addEventListener("click", startNewGame.errorCheck);
})()

const displaController = (() => {
    const player = startNewGame.playerNames;
    const _cleanUp = () => {
        field.removeEventListener('click', makeAMove, {once:true});
    }
    const _draw = () => {
        const declareWin = document.querySelector(".declareWin");
        declareWin.textContent = `${player[0].name}'s and ${player[1].name}'s match has ended in a draw.`;
    }

})






