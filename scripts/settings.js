const SHOW_SETTINGS = () => {
    let gameState = FETCH_GAME_DATA()
    init = !init
    CREATE_MODAL(`
        <div>
            <h4>Game Settings</h4>
            <ul type='none'>
                <li class='setting'>
                    <p>Player Name</p>
                    <p><input type='text' class='settinginput' value=${gameState.userName} spellcheck='false' disabled/><button onclick='EDIT_PLAYER_NAME(this)'>Edit</button><button style="display: none">Save</button></p>
                </li>

                <li class='setting'>
                    <p>Add your own words <br><em><small>Words Added: <span id="added">${gameState.userWords.length}</span></small></em></p>
                    <p><input type='text' oninput='validateInput(this, this.value)' class='settinginput'/><button id='add' class='settingbtn' onclick='ADD_WORD(this)' disabled>Add Word</button></p>
                </li>

                <li class='setting'>
                    <p>Highscore</p>
                    <p><strong style='font-size: 2rem'>${gameState.highscore}</strong><button class='settingbtn' onclick='RESET_HS(this)'>Reset</button></p>
                </li>

                <li class='setting'>
                    <p>Game data</p>
                    <p><button onclick='CLEAR_DATA()'>Clear</button></p>
                </li>
            </ul>
        </div>
    `)

    validateInput = (el, val) => {
        if (val.trim().length >= 4) {
            el.nextSibling.disabled = false;
        } else {
            el.nextSibling.disabled = !false;
        }
    }

    EDIT_PLAYER_NAME = (btn) => {
        if (!init) {
            btn.previousSibling.disabled = false
            btn.style.display = "none"
            btn.nextSibling.style.display = "block"
            btn.nextSibling.onclick = () => {
                if (btn.previousSibling.value.trim() && btn.previousSibling.value.trim().length < 10 && btn.previousSibling.value.trim().length > 2) {
                    gameState.userName = btn.previousSibling.value.trim()
                    UPDATE_GAME_DATA(gameState)
                    btn.previousSibling.disabled = !false
                    btn.nextSibling.style.display = "none"
                    btn.style.display = "block"
                    PLAYER_NAME.innerHTML = `Player: ${gameState.userName}`
                } else {
                    alert("Player Name should be between 2 and 10 characters in length")
                }
            }
        }
    }
    ADD_WORD = (btn) => {
        if (btn.previousSibling.value.trim() && btn.previousSibling.value.trim().length < 16 && btn.previousSibling.value.trim().length >= 4) {
            let bool = confirm(`You are about to add the new word ${btn.previousSibling.value.trim()}. This action cannot be undone, ensure the word is correctly spelt. Click OK to add, Cancel to make corrections`)
            if (bool) {
                if (!gameState.userWords.map(val => val.toLowerCase()).includes(btn.previousSibling.value.trim().toLowerCase())) {
                    gameState.userWords.push(btn.previousSibling.value.trim())
                    UPDATE_GAME_DATA(gameState)
                    document.querySelector("#added").innerHTML = gameState.userWords.length
                    alert(`Added new word ${btn.previousSibling.value.trim()}`)
                    btn.previousSibling.value = ""
                } else {
                    alert("Word already exists. Add another word.")
                }
            } else {
                return
            }
        }
    }
    RESET_HS = (btn) => {
        let bool = confirm("You are about to reset your game highscore, this action cannot be undone. Click OK to proceed")
        if (bool) {
            gameState.highscore = 0
            UPDATE_GAME_DATA(gameState)
            btn.previousSibling.innerHTML = gameState.highscore
            HIGHSCORE.innerHTML = `Highscore: ${gameState.highscore}`
        }
    }
    CLEAR_DATA = () => {
        let bool = confirm("You are about to clear data related to this application, this action cannot be undone. Click OK to confirm your action This will reload the page.")
        if (bool) {
            gameState.highscore = 0;
            gameState.userName = ""
            gameState.userWords = []
            UPDATE_GAME_DATA(gameState)
            history.go(0)
        }
    }
    window.onclick = (e) => {
        if (e.target === MODALBG) {
            init = !init
            MODALBG.style.display = "none"
        }
    }
}

//add words, don't allow same words ucase or lcase
//credit
//about
//support
//bug report
//levels - uppercase, lower, cap, mixed

//sfx