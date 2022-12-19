//рандомное появление
function randomInteger(row, col) {
  // случайное число от min до (max+1)
  let randRow = Math.floor(row.min + Math.random() * (row.max + 1 - row.min));
  let randCol = Math.floor(col.min + Math.random() * (col.max + 1 - col.min));
  if (document.querySelectorAll('.game__cell').length < 16 && !exists(randRow, randCol)) {
    document.querySelector('.game__grid-cells').outerHTML = document.querySelector('.game__grid-cells').outerHTML + `
    <div class="game__cell game__cell-2" row='${randRow}' col='${randCol}'><span>2</span></div>`
    existsArr[existsArr.findIndex(element => element.col == randCol && element.row == randRow)].exists = true
  }
}

//массивы для направлений 
let cellsArrUp = []
let cellsArrDown = []
let cellsArrRight = []
let cellsArrLeft = []

function updateCells() {
  for (let i = 0; i < document.querySelectorAll('.game__cell').length; i++) {
    cellsArrUp[i] = document.querySelectorAll('.game__cell')[i]
    cellsArrDown[i] = document.querySelectorAll('.game__cell')[i]
    cellsArrRight[i] = document.querySelectorAll('.game__cell')[i]
    cellsArrLeft[i] = document.querySelectorAll('.game__cell')[i]
  }
  cellsArrUp.sort((a, b) => {
    return a.getAttribute('row') - b.getAttribute('row');
  })
  cellsArrDown.sort((a, b) => {
    return b.getAttribute('row') - a.getAttribute('row');
  })
  cellsArrRight.sort((a, b) => {
    return b.getAttribute('col') - a.getAttribute('col');
  })
  cellsArrLeft.sort((a, b) => {
    return a.getAttribute('col') - b.getAttribute('col');
  })
}

//слияние цифр

//слежение на существование элемента 
let existsArr = [
  {
    row: 1,
    col: 1,
    exists: false
  },
  {
    row: 1,
    col: 2,
    exists: false
  },
  {
    row: 1,
    col: 3,
    exists: false
  },
  {
    row: 1,
    col: 4,
    exists: false
  },
  {
    row: 2,
    col: 1,
    exists: false
  },
  {
    row: 2,
    col: 2,
    exists: false
  },
  {
    row: 2,
    col: 3,
    exists: false
  },
  {
    row: 2,
    col: 4,
    exists: false
  },
  {
    row: 3,
    col: 1,
    exists: false
  },
  {
    row: 3,
    col: 2,
    exists: false
  },
  {
    row: 3,
    col: 3,
    exists: false
  },
  {
    row: 3,
    col: 4,
    exists: false
  },
  {
    row: 4,
    col: 1,
    exists: false
  },
  {
    row: 4,
    col: 2,
    exists: false
  },
  {
    row: 4,
    col: 3,
    exists: false
  },
  {
    row: 4,
    col: 4,
    exists: false
  },
]

//Задержка или Promise для последовательноси
let delay = (ms = 0) => new Promise((resolve) => setTimeout(() => resolve(), ms))

//exists существует ли ячейка
function exists(row, col) {
  // if (existsArr.find(element => element.col == col && element.row == row) == undefined) {
  //   console.log('нет такой');
  // } else if (!existsArr.find(element => element.col == col && element.row == row).exists) {
  //   console.log('пусто, можно идти');
  // } else if (existsArr.find(element => element.col == col && element.row == row).exists) {
  //   console.log('есть, нельзя идти');
  // }

  // console.log(existsArr.find(element => element.col == col && element.row == row));
  if (existsArr.find(element => element.col == col && element.row == row) == undefined) {
    return undefined
  }

  return existsArr.find(element => element.col == col && element.row == row).exists
}



randomInteger({ min: 1, max: 1 }, { min: 1, max: 1 });
randomInteger({ min: 2, max: 2 }, { min: 1, max: 1 });
randomInteger({ min: 3, max: 3 }, { min: 4, max: 4 });
randomInteger({ min: 4, max: 4 }, { min: 4, max: 4 });


updateCells()






//Управление

document.addEventListener("keyup", function (event) {
  delay().then(() => {
  }).then(() => {
    if (event.code === 'ArrowUp') {
      move('up')
    }
    if (event.code === 'ArrowDown') {
      move('down')
    }
    if (event.code === 'ArrowRight') {
      move('right')
    }
    if (event.code === 'ArrowLeft') {
      move('left')
    }
  }).then(() => {
    delay(250).then(() => {
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
        randomInteger({ min: 1, max: 4 }, { min: 1, max: 4 });
        updateCells()
      }
    })
  })
});

//ориентирование когда нужно остановить движение ячейки
// side - up, down, left, right





function move(side) {
  if (side == 'up') {
    cellsArrUp.forEach(cell => {
      for (let i = 0; i < 4; i++) {
        //если не существует ячейки на ряду cell.getAttribute('row') - 1, в колонке cell.getAttribute('col')
        if (exists(Number(cell.getAttribute('row')) - 1, cell.getAttribute('col')) == false) {
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false
          cell.setAttribute('row', Number(cell.getAttribute('row')) - 1)
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true
        } else if (exists(Number(cell.getAttribute('row')) - 1, cell.getAttribute('col')) == true &&
          cell.querySelector('span').textContent ==
          cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row')) - 1
            && element.getAttribute('col') == Number(cell.getAttribute('col'))).querySelector('span').textContent) {


          console.log(cell, cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row')) - 1
            && element.getAttribute('col') == Number(cell.getAttribute('col'))));

          //убираем существование нижней клетки
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false

          //соединяем нижнюю ячейку с верхней сдвигая нижнюю к ней
          cell.setAttribute('row', Number(cell.getAttribute('row')) - 1)
          console.log(cell);

          //не нужно
          // existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true

          // delay(75).then(() => {
          //   console.log(cellsArrUp);
          cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row'))
            && element.getAttribute('col') == Number(cell.getAttribute('col'))).querySelector('span').textContent = Number(cell.querySelector('span').textContent) * 2

          cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row'))
            && element.getAttribute('col') == Number(cell.getAttribute('col'))).classList.remove(`game__cell-${Number(cell.querySelector('span').textContent)}`)

          cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row'))
            && element.getAttribute('col') == Number(cell.getAttribute('col'))).classList.add(`game__cell-${Number(cell.querySelector('span').textContent) * 2}`)

          delay(75).then(() => cell.remove())
            .then(() => updateCells())
          // }).then(() => {

          //   cell.remove()

          // }).then(() => {
          //   updateCells()
          // })

        }
      }
    })
  }

  if (side == 'down') {
    cellsArrDown.forEach(cell => {
      for (let i = 0; i < 4; i++) {
        //если не существует ячейки на ряду cell.getAttribute('row') + 1, в колонке cell.getAttribute('col')
        if (exists(Number(cell.getAttribute('row')) + 1, cell.getAttribute('col')) == false) {
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false
          cell.setAttribute('row', Number(cell.getAttribute('row')) + 1)
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true

        }
      }
    })
  }

  if (side == 'right') {

    cellsArrRight.forEach(cell => {
      for (let i = 0; i < 4; i++) {
        console.log(cell);

        //если не существует ячейки на ряду cell.getAttribute('row'), в колонке cell.getAttribute('col') + 1
        // console.log(exists(cell.getAttribute('col'), Number(cell.getAttribute('col')) + 1));
        if (exists(cell.getAttribute('row'), Number(cell.getAttribute('col')) + 1) == false) {
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false
          cell.setAttribute('col', Number(cell.getAttribute('col')) + 1)
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true
        }
      }
    })
  }

  if (side == 'left') {
    cellsArrLeft.forEach(cell => {
      for (let i = 0; i < 4; i++) {
        //если не существует ячейки на ряду cell.getAttribute('row'), в колонке cell.getAttribute('col') - 1
        if (exists(cell.getAttribute('row'), Number(cell.getAttribute('col')) - 1) == false) {
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false
          cell.setAttribute('col', Number(cell.getAttribute('col')) - 1)
          existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true
        }
      }
    })
  }
}







/*
function move(side) {
  delay().then(() => {
    if (side == 'up') {
      cellsArrUp.forEach(cell => {
        for (let i = 0; i < 4; i++) {
          //если не существует ячейки на ряду cell.getAttribute('row') - 1, в колонке cell.getAttribute('col')
          if (exists(Number(cell.getAttribute('row')) - 1, cell.getAttribute('col')) == false) {
            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false
            cell.setAttribute('row', Number(cell.getAttribute('row')) - 1)
            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true
          } else if (exists(Number(cell.getAttribute('row')) - 1, cell.getAttribute('col')) == true &&
            cell.querySelector('span').textContent ==
            cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row')) - 1
              && element.getAttribute('col') == Number(cell.getAttribute('col'))).querySelector('span').textContent) {


            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false

            cell.setAttribute('row', Number(cell.getAttribute('row')) - 1)

            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true

            delay(500).then(() => {

              cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row'))
                && element.getAttribute('col') == Number(cell.getAttribute('col'))).querySelector('span').textContent = Number(cell.querySelector('span').textContent) * 2

              cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row'))
                && element.getAttribute('col') == Number(cell.getAttribute('col'))).classList.remove(`game__cell - ${ Number(cell.querySelector('span').textContent) } `)

              cellsArrUp.find(element => element.getAttribute('row') == Number(cell.getAttribute('row'))
                && element.getAttribute('col') == Number(cell.getAttribute('col'))).classList.add(`game__cell - ${ Number(cell.querySelector('span').textContent) * 2 } `)

            }).then(() => {

              cell.remove()

            }).then(() => {
              updateCells()
            })

          }
        }
      })
    }

    if (side == 'down') {
      cellsArrDown.forEach(cell => {
        for (let i = 0; i < 4; i++) {
          //если не существует ячейки на ряду cell.getAttribute('row') + 1, в колонке cell.getAttribute('col')
          if (exists(Number(cell.getAttribute('row')) + 1, cell.getAttribute('col')) == false) {
            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false
            cell.setAttribute('row', Number(cell.getAttribute('row')) + 1)
            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true

          }
        }
      })
    }

    if (side == 'right') {

      cellsArrRight.forEach(cell => {
        for (let i = 0; i < 4; i++) {
          //если не существует ячейки на ряду cell.getAttribute('row'), в колонке cell.getAttribute('col') + 1
          // console.log(exists(cell.getAttribute('col'), Number(cell.getAttribute('col')) + 1));
          if (exists(cell.getAttribute('row'), Number(cell.getAttribute('col')) + 1) == false) {
            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false
            cell.setAttribute('col', Number(cell.getAttribute('col')) + 1)
            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true
          }
        }
      })
    }

    if (side == 'left') {
      cellsArrLeft.forEach(cell => {
        for (let i = 0; i < 4; i++) {
          //если не существует ячейки на ряду cell.getAttribute('row'), в колонке cell.getAttribute('col') - 1
          if (exists(cell.getAttribute('row'), Number(cell.getAttribute('col')) - 1) == false) {
            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = false
            cell.setAttribute('col', Number(cell.getAttribute('col')) - 1)
            existsArr[existsArr.findIndex(element => element.row == cell.getAttribute('row') && element.col == cell.getAttribute('col'))].exists = true
          }
        }
      })
    }
  }).then(() => {
    delay(200).then(() => {
      // randomInteger({ min: 1, max: 4 }, { min: 1, max: 4 });
      updateCells()
    })
  })
}

*/
