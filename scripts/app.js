if (SAVE_STATE().userName !== "") {
    let appData = SAVE_STATE()
    CREATE_MODAL(`
        <h2>Welcome back, ${appData.userName}!</h2><br><br>
        <button onclick="startGame()">Play New Game</button>
        <label>
            <input type="checkbox" oninput="SET_TIME_BASED(this.checked)" ${FETCH_GAME_DATA().isTimeBased && "checked"}/>
            <span>Enable Timed Mode</span>
        </label>
    `);
} else {
    let appData = SAVE_STATE()
    CREATE_MODAL(`
        <h2>Set Player Name</h2>
        <small><em>You can change this name at anytime.</em></small>
        <input type="text" spellcheck="false" autocomplete="off" placeholder="Player Name" id="player-name">
        <button onclick="setUserName(this.previousElementSibling.value)">Go</button>
    `);

    setUserName = (val) => {
        if (!val) {
            alert("Player name cannot be empty. Please enter a valid name to continue.")
            return
        };
        appData.userName = val;
        UPDATE_GAME_DATA(appData);
        CREATE_MODAL(`
        <h2>Welcome, ${appData.userName}!</h2><br><br>
        <button onclick="startGame()">Play New Game</button>
        <label>
            <input type="checkbox" oninput="SET_TIME_BASED(this.checked)"/>
            <span>Enable Timed Mode</span>
        </label>
    `);
    };
}

const SET_TIME_BASED = (checked) => {
    let appData = FETCH_GAME_DATA();
    appData.isTimeBased = checked;
    UPDATE_GAME_DATA(appData);
}