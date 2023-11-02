const boardSpaces = []

const boardModule = (function() {
    const board = document.querySelector('.board')

    function Space (index) {
        this.name = index,
        this.mark = '',
        domDisplay = () => {
            const space = document.createElement('div')
            space.classList.add('board-space')
            board.appendChild(space)
        }
    }
    
    (function _createSpaces () {
        for (let i = 0; i < 9; i++) {
            const space = new Space(i)
            // if (i % 2 === 0) {space.mark = 'X'}
            // else {space.mark = 'O'}
            boardSpaces.push(space)
        }
        renderSpaces()
    })()
    
    function renderSpaces() {
        boardSpaces.forEach(space => {
            this.domDisplay()
        })
    }
    

    return {
        boardSpaces, renderSpaces
    }
})()

// const playerModule = (function() {
//     (function iterate() {
//         boardSpaces.forEach(space => console.log(space))
//     })()
// })()