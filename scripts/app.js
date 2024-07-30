if (SAVE_STATE().userName !== "") {
    let appData = SAVE_STATE()
    CREATE_MODAL(`
        <h2>Welcome back, ${appData.userName}!</h2><br><br>
        <button onclick="startGame()">Play New Game</button>
    `)
} else {
    let appData = SAVE_STATE()
    CREATE_MODAL(`
        <h2>Set Player Name</h2>
        <small><em>You can change this name at anytime.</em></small>
        <input type="text" spellcheck="false" autocomplete="off" placeholder="Player Name" id="player-name">
        <button onclick="setUserName(this.previousElementSibling.value)">Go</button>
    `)

    setUserName = (val) => {
        if (!val) {
            alert("Player name cannot be empty. Please enter a valid name to continue.")
            return
        }
        appData.userName = val
        UPDATE_GAME_DATA(appData)
        CREATE_MODAL(`
        <h2>Welcome, ${appData.userName}!</h2><br><br>
        <button onclick="startGame()">Play New Game</button>
    `)
    }
}