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

const playModule = (function() {
    const spaces = document.querySelectorAll('.board-space')
    //turnOver has to come in from turnModule, use turnOver as an argument in playModule
    let turnOver = true

    function interact(playermark){
        spaces.forEach(space => space.addEventListener('click', () => {
            turnOver = !turnOver;
            addMark(playermark, space, turnOver)
        }))
    }
    
    function addMark(playermark, space, turnOver) {
        if((space.textContent === '') && !turnOver) {
            boardSpaces[space.dataset.index].mark = playermark
            space.textContent = playermark
            turnOver = true
        }
    }


    return {
        interact,
    }
})()

const playerModule = (function(){
    function playerCreator(name, mark, computer) {
        const playerName = name
        const playerMark = mark
        const playerScore = 0
        
        const getPlayerScore = () => playerScore
        const updatePlayerScore = () => playerScore++
        // const playerAction = () => playModule.interact(playerMark)

        return {
            playerName,
            playerMark,
            updatePlayerScore,
            getPlayerScore,
            // playerAction
        }
    }


    return {
        playerCreator,
    }
})()

const fede = playerModule.playerCreator('Fede', 'X')
const pepe = playerModule.playerCreator('Pepe', 'O')

const nextTurn = document.querySelector('.next-turn-btn')
let turnCount = 0

const turnModule = function() {

    if(turnCount % 2 === 0) {
        fede.playerAction()
        turnCount++
    } else if (turnCount % 2 !== 0) {
        pepe.playerAction()
        turnCount++
    }
}

nextTurn.addEventListener('click', turnModule)


// const turnModule = (function(){
//     const fede = playerModule.playerCreator('Fede', 'X')
//     let turnOver = false
//     playModule(turnOver)
//     return {
//         fede,
//         turnOver
//     }
// })()

// alternating turn system with recursion and % of 2 with variable that adds 1 after turnOver is set to true, unless finish condition is met (finish condition is first if)
// turn system with event listener, alternating x and o, and checks for victory conditions