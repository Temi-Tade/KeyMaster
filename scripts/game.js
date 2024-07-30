const GET_WORDS = async () => {
	let gameState = FETCH_GAME_DATA();
	CREATE_MODAL(`
		<h3>Fetching words...</h3>
	`)
	await fetch("https://random-word-api.vercel.app/api?words=500")
	.then(res => res.json())
	.then(data => {
		gameState.words = [...data];
		UPDATE_GAME_DATA(gameState);
	})
	.catch(err => alert(`${err.message} words. It seems you have a problem with your connection, we will use the words saved from the last time you were online.`));
	// MODALBG.style.display = "none"
}

const GENERATE_WORD = () => {
    let gameState = FETCH_GAME_DATA()
	CPU_WORD.innerHTML = [...gameState.words, ...gameState.userWords][Math.floor(Math.random()*[...gameState.words, ...gameState.userWords].length)]
}

const SET_GAME_DATA = () => {
    init = true
    let gameState = FETCH_GAME_DATA()
    HIGHSCORE.innerHTML = `Highscore: ${gameState.highscore}`
    POINTS.innerHTML = `Score: ${points}`
    PLAYER_NAME.innerHTML = `Player: ${gameState.userName}`
}

const SET_HIGH_SCORE = () => {
    let gameState = FETCH_GAME_DATA()
    gameState.highscore = points > gameState.highscore ? points : gameState.highscore
    UPDATE_GAME_DATA(gameState)
}

const GAME_OVER = () => {
	// window.onkeypress = (e) => e.preventDefault()
    let gameState = FETCH_GAME_DATA()
	isGameOver = !isGameOver
    SET_HIGH_SCORE()
	CREATE_MODAL(`
        ${gameState.highscore > points ? `<h2>Game Over, You lose</h2>
			<h3>Your Score: <br><p class='score'>${points}</p></h3>
			<br><button onclick='replay()'>New Game</button>` : 
			`<h2>Game Over, You lose</h2>
			<h3>Your Score: <br><p class='score'>${points}</p></h3>
			<h4>New Highscore!</h4 >
			<button onclick='replay()'>New Game</button>`}
    `)
}

const SCORE_FX = () => {
	let el = document.createElement("span");
	el.setAttribute("class", "fx")
	el.textContent = "+10"
	document.querySelector("#word").appendChild(el);
	el.animate({
		transform: ["translateY(0)", "translateY(-20rem)"],
		opacity: ["1", "0"],
	}, {
		duration: 700,
		iterations: 1
	})
	setTimeout(() => {
		document.querySelector("#word").removeChild(el);
	}, 400);
}

const CHECK_WORD = () => {
	if(USER_WORD.innerHTML.length === CPU_WORD.innerHTML.length){
		if(USER_WORD.innerHTML === CPU_WORD.innerHTML){
			points += 10
			SCORE_FX()
            POINTS.innerHTML = `Score: ${points}`
			USER_WORD.innerHTML = ""
			GENERATE_WORD()
		}else{
			GAME_OVER()
		}
	}else{
		if(USER_WORD.innerHTML[USER_WORD.innerHTML.length-1] === CPU_WORD.innerHTML[USER_WORD.innerHTML.length-1]){
			return
		}else{
			GAME_OVER()
		}
	}
}

const startGame = () => {
	GET_WORDS()
    document.querySelector("#dialog_bg").style.display = "none"
    isGameOver = false;
    points = 0;
    SET_GAME_DATA()
	GENERATE_WORD()
}

const replay = () => {
	USER_WORD.innerHTML = ""
	points = 0
	startGame()
}

window.onkeypress = (e) => {
	if(!isGameOver && init){
		USER_WORD.innerHTML += e.key
		CHECK_WORD()
	}
}

// settings
// customize game: word length, lang,