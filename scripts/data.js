const SAVE_STATE = () => {
    if (!localStorage.getItem("typing_game_data")) {
        const APP_DATA = {
            userName: "",
            words: [],
            userWords: [],
            highscore: 0
        }
    
        localStorage.setItem("typing_game_data", JSON.stringify(APP_DATA))
    } else {
        return JSON.parse(localStorage.getItem("typing_game_data"))
    }
}

const UPDATE_GAME_DATA = (val) => {
    localStorage.setItem("typing_game_data", JSON.stringify(val))
}

const FETCH_GAME_DATA  = () => {return JSON.parse(localStorage.getItem("typing_game_data"))}

SAVE_STATE()

//session storage should be used for an instance of a game (duration, mode, correct, wrong, points, timeleft)
//sound, icons, font
//option to edit user data