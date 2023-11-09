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
        const playerScore = 0
        
        const getPlayerScore = () => playerScore
        const updatePlayerScore = () => playerScore++

        return {
            playerName,
            playerMark,
            updatePlayerScore,
            getPlayerScore,
        }
    }


    return {
        playerCreator,
    }
})()

const players = []

const player1 = playerModule.playerCreator('Fede', 'X')
const player2 = playerModule.playerCreator('Pepe', 'O')
players.push(player1)
players.push(player2)

const playModule = (function() {
    const spaces = document.querySelectorAll('.board-space')
    let p1Choices = []
    let p2Choices = []
    
    function interact(){
        let turnNum = 0;

        spaces.forEach(space => space.addEventListener('click', () => {
            if (space.textContent === '') {
                addMark(turnNum, space)
                turnNum++
            }
        }))
    }
    
    //if player2 is ai turnNum doesnt change, or rather it redirects to other code
    function addMark(turnNum, space) {
        if (turnNum % 2 === 0) {
            boardSpaces[space.getAttribute('data-index')].mark = players[0].playerMark
            space.textContent = players[0].playerMark
            p1Choices.push(boardSpaces[space.getAttribute('data-index')].name)

            const check = endGame(p1Choices)
            if (check) {console.log('p1 victory');}
        } else if (turnNum % 2 !== 0) {
            boardSpaces[space.getAttribute('data-index')].mark = players[1].playerMark
            space.textContent = players[1].playerMark
            p2Choices.push(boardSpaces[space.getAttribute('data-index')].name)

            const check = endGame(p2Choices)
            if(check) {console.log('p2 victory');}
        }
    }
    interact()

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
        // p1Choices.sort()
        // p2Choices.sort()
        // const p1Str = p1Choices.join('').toString('')
        // const p2Str = p2Choices.join('').toString('')
        playerChoice.sort()
        const pChoiceStr = playerChoice.join('').toString('')
        let victory = false;

        //this function uses forEach which doesn't have a break statement
        //if it becomes necessary in later implementations replace forEach with a for loop
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
                        // victory speech here
                        // player1.updatePlayerScore
                        // player1.getPlayerScore
                        return victory = true
                    }
                })
            })
        }
        checkVictory(pChoiceStr)
        return victory
    }
    

    return {
        interact, endGame
    }
})()