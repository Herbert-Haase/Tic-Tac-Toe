const gameBoard = (() => {
    let value = 1;
    const resetValue = () => {
        value = 1;
        return value;
    }
    const _switching = () => {
            value++;
            return value;
    }
    const move = () => {
        return _switching() % 2 === 0? "O":"X";
    }
    const field = () =>{
        return document.querySelectorAll("[data-field]");
    }
    return {move, field, resetValue};
})();

const players = (name) => {
    const win = () => {
        return `${name} won this match.`;
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
    gameBoard.resetValue();
    displayController.resetStat();
    displayController.announce("");
}
    
    return {errorCheck, playerNames};
})();

function makeAMove() {
    const move = gameBoard.move();
    _colorOs(move,this);
    this.textContent = move;

    let index = this.getAttribute("data-field");
    index = parseInt(index);
    displayController.declareEnd(move, index);

    function _colorOs(move,ele) {
        if(move === "O") {
            ele.style.color = "#0284c7";
        }
    }
}

(()=>{
    const button = document.querySelector("button");
    button.addEventListener("click", startNewGame.errorCheck);
})()

const displayController = (() => {
    const player = startNewGame.playerNames;
    const fields = document.querySelectorAll("[data-field]");
    let stat = {};

    const resetStat = () => {
        stat = {};
    }

    const _cleanUp = () => {
        fields.forEach((field) => {
        field.removeEventListener('click', makeAMove, {once:true})});
    }
    const announce = (str) => {
        const declareWin = document.querySelector(".declareWin");
        declareWin.textContent = str;
    }
    const _draw = () => {
        const draw = `${player[0].name}'s and ${player[1].name}'s match has ended in a draw.`;
        announce(draw);
    }
    const _algorythm = (move, index) => {


        stat[index] = move;
        switch(true) {
            case(stat[0] === move && stat[1] === move && stat[2] === move):
            case(stat[3] === move && stat[4] === move && stat[5] === move):
            case(stat[6] === move && stat[7] === move && stat[8] === move):
              return move;
              break;
            case(stat[0] === move && stat[3] === move && stat[6] === move):
            case(stat[1] === move && stat[4] === move && stat[7] === move):
            case(stat[2] === move && stat[5] === move && stat[8] === move):
              return move;
              break;
            case(stat[0] === move && stat[4] === move && stat[8] === move):
            case(stat[2] === move && stat[4] === move && stat[6] === move):
              return move;
              break;
            
            case(Object.keys(stat).length === 9):
              _draw()            
            default:
              return "undecided";
        }
    }
    const declareEnd = (move, index) => {
        let declare;
        const decision = _algorythm(move, index);
        if(decision === "undecided") {
            return;
        } else if(decision === "O") {
            declare = player[0].win();
        } else declare = player[1].win();

        announce(declare);
        _cleanUp();
    }

    return {declareEnd, resetStat, announce};

})();






