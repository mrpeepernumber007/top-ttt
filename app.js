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

const fede = playerModule.playerCreator('Fede', 'X')
const pepe = playerModule.playerCreator('Pepe', 'O')
players.push(fede)
players.push(pepe)

const playModule = (function() {
    const spaces = document.querySelectorAll('.board-space')
    
    function interact(){
        let turnNum = 0;
        spaces.forEach(space => space.addEventListener('click', () => {
            if (space.textContent === '') {
                addMark(turnNum, space)
                turnNum++
            }
            console.log(boardSpaces);
            checkGame()
        }))
    }
    
    //if player2 is ai turnNum doesnt change, or rather it redirects to other code
    function addMark(turnNum, space) {
        if (turnNum % 2 === 0) {
            boardSpaces[space.getAttribute('data-index')].mark = players[0].playerMark
            space.textContent = players[0].playerMark
        } else if (turnNum % 2 !== 0) {
            boardSpaces[space.getAttribute('data-index')].mark = players[1].playerMark
            space.textContent = players[1].playerMark
        }
    }
    interact()


    return {
        interact,
    }
})()

function checkGame () {
    const spaces = document.querySelectorAll('.board-space')
    
}