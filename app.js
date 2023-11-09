const boardSpaces = []

const boardModule = (function() {
    const board = document.querySelector('.board')

    function Space (index) {
        this.name = index,
        this.mark = ''
    }

    function domDisplay(spaceObj) {
        const spaceElement = document.createElement('div')
        spaceElement.classList.add('board-space')
        spaceElement.setAttribute('data-index', spaceObj.name)
        spaceElement.textContent = spaceObj.mark
        board.appendChild(spaceElement)
    }
    
    (function _createSpaces () {
        for (let i = 0; i < 9; i++) {
            const space = new Space(i)
            boardSpaces.push(space)
        }
        renderSpaces()
    })()
    
    function renderSpaces() {
        boardSpaces.forEach(space => {
            domDisplay(space)
        })
    }
    

    return {
        boardSpaces, renderSpaces
    }
})()

const playerModule = (function(){
    function playerCreator(name, mark, computer) {
        const playerName = name
        const playerMark = mark
        const playerAI = computer
        let playerScore = 0
        
        const getPlayerScore = () => playerScore
        const updatePlayerScore = () => playerScore++

        return {
            playerName,
            playerMark,
            playerAI,
            updatePlayerScore,
            getPlayerScore,
        }
    }


    return {
        playerCreator,
    }
})()

const player1 = playerModule.playerCreator('Fede', 'X', false)
const player2 = playerModule.playerCreator('Pepe', 'O', true)

const playModule = (function() {
    const spaces = document.querySelectorAll('.board-space')
    let p1Choices = []
    let p2Choices = []
    let availableSpots = JSON.parse(JSON.stringify(boardSpaces))
    
    function interact(){
        let turnNum = 0;
        spaces.forEach(space => {
            space.addEventListener('click', () => {
                if (space.textContent === '') {
                    if ((turnNum % 2 === 0) && (player2.playerAI === false)){
                        addMark(space, player1, p1Choices)
                    } else if ((turnNum % 2 !== 0) && (player2.playerAI === false)) {
                        addMark(space, player2, p2Choices)
                    } else if ((turnNum % 2 === 0) && (player2.playerAI === true)) {
                        //missing ai parameter
                        //when player1 clicks, player2AI makes a play
                        //for impossible ai make it choose from winCon
                        addMark(space, player1, p1Choices)
                        addMark(space, player2, p2Choices, true)
                        turnNum++
                    }
                    turnNum++
                }
        })})
    }

    function playerVictory(choices, player) {
        const check = endModule.endGame(choices)
        if(check) {
            choices = []
            player.updatePlayerScore()
            return console.log(`${player.name}'s score is ` + player.getPlayerScore());
        }
    }
    
    //if player2 is ai turnNum doesnt change, or rather it redirects to other code
    function addMark(space, player, choices, ai) {
        if (!ai) {
            boardSpaces[space.getAttribute('data-index')].mark = player.playerMark
            space.textContent = player.playerMark
            choices.push(boardSpaces[space.getAttribute('data-index')].name)
        } else if (ai) {
            //ai implementation here
            function recursiveAi(){
                const chosen = Math.floor(Math.random()*spaces.length)
                if(spaces[chosen].textContent === '') {
                    boardSpaces[chosen].mark = player.playerMark
                    spaces[chosen].textContent = player.playerMark
                    choices.push(boardSpaces[chosen].name)
                } else {
                    recursiveAi()
                }
            }
            recursiveAi()
        }
            
        playerVictory(choices, player)
    }
    interact()

    
    return {
        interact,
        addMark,
        p1Choices,
        p2Choices,
    }
})()

const endModule = (function (){
    function endGame(playerChoice) {
        const winCon = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ]

        playerChoice.sort()
        const pChoiceStr = playerChoice.join('').toString('')
        let victory = false;

        //this function uses forEach which doesn't have a break statement
        function checkVictory(choices) {
            winCon.forEach((comb) => {
                let includes = 0
                comb.forEach((num) => {
                    let numStr = num.toString()
                    for (let i = 0; i < choices.length; i++) {
                        if (choices[i].includes(numStr)) {
                            includes++
                        }
                    }
                    if (includes >= 3) {
                        return victory = true
                    }
                })
            })
        }
        checkVictory(pChoiceStr)
        return victory
    }

    return {
        endGame
    }
})()

//to end the game, revise boardModule to enable resetting the board
//in playerVictory reset boardSpaces value to boardSpaces = []
//reset availableSpots too

// function interact(){
//         let turnNum = 0;
//         for (let i = 0; i < spaces.length; i++) {
//             if (spaces[i].textContent === '') {
//                 availableSpots.splice(i, 1)
//                 console.log(availableSpots);
//             }
//             spaces[i].addEventListener('click', () =>{
//                 if (spaces[i].textContent === '') {
//                     if ((turnNum % 2 === 0) && (player2.playerAI === false)){
//                         addMark(spaces[i], player1, p1Choices)
//                     } else if ((turnNum % 2 !== 0) && (player2.playerAI === false)) {
//                         addMark(spaces[i], player2, p2Choices)
//                     } else if ((turnNum % 2 === 0) && (player2.playerAI === true)) {
//                         //missing ai parameter
//                         //when player1 clicks, player2AI makes a play
//                         //for impossible ai make it choose from winCon
//                         addMark(spaces[i], player1, p1Choices)
//                         addMark(spaces[i], player2, p2Choices, true)
//                     }
//                     turnNum++
//                 }
//             })
//         }
//     }