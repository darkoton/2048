let gameBody = document.querySelector('.game__squares')

let squaresLea = [
  {
    row: 1,
    col: 1,
    free: true,
  },
  {
    row: 1,
    col: 2,
    free: true,
  },
  {
    row: 1,
    col: 3,
    free: true,
  },
  {
    row: 1,
    col: 4,
    free: true,
  },
  {
    row: 2,
    col: 1,
    free: true,
  },
  {
    row: 2,
    col: 2,
    free: true,
  },
  {
    row: 2,
    col: 3,
    free: true,
  },
  {
    row: 2,
    col: 4,
    free: true,
  },
  {
    row: 3,
    col: 1,
    free: true,
  },
  {
    row: 3,
    col: 2,
    free: true,
  },
  {
    row: 3,
    col: 3,
    free: true,
  },
  {
    row: 3,
    col: 4,
    free: true,
  },
  {
    row: 4,
    col: 1,
    free: true,
  },
  {
    row: 4,
    col: 2,
    free: true,
  },
  {
    row: 4,
    col: 3,
    free: true,
  },
  {
    row: 4,
    col: 4,
    free: true,
  },
]

function updateLea() {
  squaresLea.forEach(element => {
    !document.querySelector(`[data-row="${element.row}"][data-col="${element.col}"]`) ? element.free = true :
      element.free = false
  })
}

function spawn() {
  // случайное число от min до (max+1)
  let freeSquares = squaresLea.filter(element => element.free == true)
  let rand = Math.floor(Math.random() * freeSquares.length)
  let value = (Math.random() * 100).toFixed(0) <= 80 ? 2 : 4

  if (freeSquares[rand] == undefined) { console.log('места нету'); return };

  let { row, col } = freeSquares[rand]

  let element = document.createElement('div')
  element.dataset.row = row
  element.dataset.value = value
  element.dataset.col = col
  element.classList.add('square')
  element.textContent = value
  gameBody.appendChild(element)

  squaresLea[squaresLea.indexOf(freeSquares[rand])].free = false

  let squares = Array.from(document.querySelectorAll(".square:not(.deleted)"))

  if (squares.length >= 16) {
    console.log('test');
    setTimeout(lose(squares), 1000)
  }
}


spawn();
spawn();
