const MODALBG = document.querySelector("#dialog_bg")
const MODAL = document.querySelector("#dialog")
const PLAYER_NAME = document.querySelector("#player_name")
const POINTS = document.querySelector("#score")
const HIGHSCORE = document.querySelector("#highscore")
const CPU_WORD = document.querySelector("#cpu_word")
const USER_WORD = document.querySelector("#user_word")
let isGameOver;
let points;
let count = 0;
let init = false;

const CREATE_MODAL = (text) => {
    MODALBG.style.display = "block";
    MODALBG.animate({
        opacity: ["0","1"],
    },
    {
        duration: 500
    });
    MODAL.innerHTML = text;
}
