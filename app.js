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

const gameModule = (function() {
    const spaces = document.querySelectorAll('.board-space')
    let turnOver = false;
    
    function interact(playermark){
        spaces.forEach(space => space.addEventListener('click', () => {
            addMark(playermark, space)
        }))
    }
    
    function addMark(playermark, space) {
        if((space.textContent === '') && turnOver === false) {
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
        const playerAction = () => gameModule.interact(playerMark)

        return {
            playerName,
            playerMark,
            updatePlayerScore,
            getPlayerScore,
            playerAction
        }
    }
    // const fede = playerCreator('Fede', 'X')
    // fede.playerAction()

    return {
        playerCreator,
    }
})()

// alternating turn system with recursion and % of 2 with variable that adds 1 after turnOver is set to true, unless finish condition is met (finish condition is first if)