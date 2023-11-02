const ticAreas = document.querySelectorAll('.tic-area')

function checkAreas (a, b, c) {
    if (
        a.classList.contains('taken')
        &&
        b.classList.contains('taken')
        &&
        c.classList.contains('taken')
    ) {
        return true;
    } else {
        return false}
}

function checkVictory() {
    const a1 = document.getElementById('area-1')
    const a2 = document.getElementById('area-2')
    const a3 = document.getElementById('area-3')
    const a4 = document.getElementById('area-4')
    const a5 = document.getElementById('area-5')
    const a6 = document.getElementById('area-6')
    const a7 = document.getElementById('area-7')
    const a8 = document.getElementById('area-8')
    const a9 = document.getElementById('area-9')

    const check1 = checkAreas(a1, a2, a3)
    const check2 = checkAreas(a1, a4, a7)
    const check3 = checkAreas(a3,a6,a9)
    const check4 = checkAreas(a9,a8,a7)
    const check5 = checkAreas(a1,a5,a9)
    const check6 = checkAreas(a3,a5,a7)
    const check7 = checkAreas(a4,a5,a6)
    const check8 = checkAreas(a2,a5,a8)

    let victory = false
    if (
        check1 || check2 || check3 || check4 || check5 || check6 || check7 || check8
    ) {
        victory = true
    }
    return console.log(victory);
}

ticAreas.forEach(area => area.addEventListener('click', () => {
    area.classList.add('taken')
    checkVictory()
}))