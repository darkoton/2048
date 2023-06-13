let deleteElements = []
let shift = 0
let score = document.querySelector('.score')
let scoreValue = 0

function scoreUpdate(num) {
  scoreValue += num

  score.querySelector('span').textContent = scoreValue
}
var startX;
var startY;
var distX;
var distY;
var threshold = 100; // минимальное расстояние свайпа для определения направления

// Обработчик начала касания
function handleTouchStart(event) {
  deleteElements.forEach(element => {
    element.remove()
  })
  Array.from(document.querySelectorAll(".square")).forEach(element => {
    element.classList.remove('new')
  })
  deleteElements = []

  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}

// Обработчик окончания касания
function handleTouchEnd(event) {
  distX = event.changedTouches[0].clientX - startX;
  distY = event.changedTouches[0].clientY - startY;

  // Определение направления свайпа по горизонтали
  if (Math.abs(distX) > threshold && Math.abs(distX) > Math.abs(distY)) {
    if (distX > 0) {
      console.log("Свайп вправо");
      move('right')
    } else {
      console.log("Свайп влево");
      move('left')
    }
  }

  // Определение направления свайпа по вертикали
  if (Math.abs(distY) > threshold && Math.abs(distY) > Math.abs(distX)) {
    if (distY > 0) {
      console.log("Свайп вниз");
      move('bottom')

    } else {
      console.log("Свайп вверх");
      move('top')

    }
  }

  if (shift > 0) {
    updateLea()
    setTimeout(() => {
      spawn()
    }, 100)
    shift = 0
  }
}

// Добавление обработчиков событий
var element = document.body; // замените "yourElement" на соответствующий идентификатор вашего элемента
element.addEventListener("touchstart", handleTouchStart, false);
element.addEventListener("touchend", handleTouchEnd, false);






document.addEventListener("keyup", function (event) {
  deleteElements.forEach(element => {
    element.remove()
  })
  Array.from(document.querySelectorAll(".square")).forEach(element => {
    element.classList.remove('new')
  })
  deleteElements = []

  if (event.code === 'ArrowUp') {
    move('top')
  }
  if (event.code === 'ArrowDown') {
    move('bottom')
  }
  if (event.code === 'ArrowRight') {
    move('right')
  }
  if (event.code === 'ArrowLeft') {
    move('left')
  }

  if ((event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowRight' || event.code === 'ArrowLeft') && shift > 0) {
    updateLea()
    setTimeout(() => {
      spawn()
    }, 100);
    shift = 0
  }
});

function sortByAxis(array, axis, value = true) {

  if (axis == 'row') {
    if (value) {
      return array.toSorted((a, b) => a.dataset.row - b.dataset.row)
    } else {
      return array.toSorted((a, b) => b.dataset.row - a.dataset.row)
    }
  }
  if (axis == 'col') {
    if (value) {
      return array.toSorted((a, b) => a.dataset.col - b.dataset.col)
    } else {
      return array.toSorted((a, b) => b.dataset.col - a.dataset.col)
    }
  }
}


function move(side) {
  let squares = Array.from(document.querySelectorAll(".square:not(.deleted)"))
  let merger = 0
  if (side == 'top') {
    sortByAxis(squares, 'row').forEach(element => {
      for (let i = 1; i < 5 && +element.dataset.row > 1 && merger == 0; i++) {
        let neighbour = document.querySelector(`:not(.deleted)[data-row="${element.dataset.row - 1}"][data-col="${element.dataset.col}"]`)
        if (!neighbour) {
          element.dataset.row = +element.dataset.row - 1
          ++shift
        } else if (neighbour && !neighbour.classList.contains("new") && neighbour.dataset.value == element.dataset.value) {
          element.dataset.row = +element.dataset.row - 1
          neighbour.dataset.value *= 2
          neighbour.textContent *= 2
          scoreUpdate(+neighbour.dataset.value)

          neighbour.classList.add('new')
          neighbour.classList.add('animation')
          setTimeout(() => {
            neighbour.classList.remove('animation')
          }, 200);

          deleteElements.push(element)
          element.classList.add('deleted')
          ++shift
          ++merger
        }
      }
      merger = 0
    });
  }
  if (side == 'bottom') {
    sortByAxis(squares, 'row', false).forEach(element => {

      for (let i = 1; i < 5 && +element.dataset.row < 4 && merger == 0; i++) {
        let neighbour = document.querySelector(`:not(.deleted)[data-row="${+element.dataset.row + 1}"][data-col="${element.dataset.col}"]`)
        if (!neighbour) {
          element.dataset.row = +element.dataset.row + 1
          ++shift
        } else if (neighbour && !neighbour.classList.contains("new") && neighbour.dataset.value == element.dataset.value) {
          element.dataset.row = +element.dataset.row + 1
          neighbour.dataset.value *= 2
          neighbour.textContent *= 2
          scoreUpdate(+neighbour.dataset.value)

          neighbour.classList.add('new')
          neighbour.classList.add('animation')
          setTimeout(() => {
            neighbour.classList.remove('animation')
          }, 200);
          deleteElements.push(element)
          element.classList.add('deleted')
          ++shift
          ++merger
        }
      }
      merger = 0
    });
  }
  if (side == 'left') {
    sortByAxis(squares, 'col').forEach(element => {
      for (let i = 1; i < 5 && +element.dataset.col > 1 && merger == 0; i++) {
        let neighbour = document.querySelector(`:not(.deleted)[data-row="${element.dataset.row}"][data-col="${element.dataset.col - 1}"]`);
        if (!neighbour) {
          element.dataset.col = +element.dataset.col - 1
          ++shift
        } else if (neighbour && !neighbour.classList.contains("new") && neighbour.dataset.value == element.dataset.value) {
          element.dataset.col = +element.dataset.col - 1
          neighbour.dataset.value *= 2
          neighbour.textContent *= 2
          scoreUpdate(+neighbour.dataset.value)

          neighbour.classList.add('new')
          neighbour.classList.add('animation')
          setTimeout(() => {
            neighbour.classList.remove('animation')
          }, 200);
          deleteElements.push(element)
          element.classList.add('deleted')
          ++shift
          ++merger
        }
      }
      merger = 0
    });
  }
  if (side == 'right') {
    sortByAxis(squares, 'col', false).forEach(element => {
      for (let i = 1; i < 5 && +element.dataset.col < 4 && merger == 0; i++) {
        let neighbour = document.querySelector(`:not(.deleted)[data-row="${element.dataset.row}"][data-col="${+element.dataset.col + 1}"]`);
        if (!neighbour) {
          element.dataset.col = +element.dataset.col + 1
          ++shift
        } else if (neighbour && !neighbour.classList.contains("new") && neighbour.dataset.value == element.dataset.value) {
          element.dataset.col = +element.dataset.col + 1
          neighbour.dataset.value *= 2
          neighbour.textContent *= 2
          scoreUpdate(+neighbour.dataset.value)

          neighbour.classList.add('new')
          neighbour.classList.add('animation')
          setTimeout(() => {
            neighbour.classList.remove('animation')
          }, 200);
          deleteElements.push(element)
          element.classList.add('deleted')
          ++shift
          ++merger
        }
      }
      merger = 0
    });
  }

  if (document.querySelector('[data-value="2048"]')) {
    winnerBody.classList.add('active')
  }


}

let loseBody = document.querySelector('.lose')
let winnerBody = document.querySelector('.winner')

function lose(squares) {

  let elementMove = []

  sortByAxis(squares, 'row').forEach(element => {
    let neighbour = document.querySelector(`:not(.deleted)[data-row="${element.dataset.row - 1}"][data-col="${element.dataset.col}"]`)
    if (neighbour && neighbour.dataset.value == element.dataset.value && !element.classList.contains('deleted')) {
      elementMove.push(element)
    }
  });

  sortByAxis(squares, 'row', false).forEach(element => {
    let neighbour = document.querySelector(`:not(.deleted)[data-row="${+element.dataset.row + 1}"][data-col="${element.dataset.col}"]`)
    if (neighbour && neighbour.dataset.value == element.dataset.value && !element.classList.contains('deleted')) {
      elementMove.push(element)
    }
  });

  sortByAxis(squares, 'col').forEach(element => {
    let neighbour = document.querySelector(`:not(.deleted)[data-row="${element.dataset.row}"][data-col="${element.dataset.col - 1}"]`)
    if (neighbour && neighbour.dataset.value == element.dataset.value && !element.classList.contains('deleted')) {
      elementMove.push(element)
    }
  });

  sortByAxis(squares, 'col', false).forEach(element => {
    let neighbour = document.querySelector(`:not(.deleted)[data-row="${element.dataset.row}"][data-col="${+element.dataset.col + 1}"]`)
    if (neighbour && neighbour.dataset.value == element.dataset.value && !element.classList.contains('deleted')) {
      elementMove.push(element)
    }
  });
  console.log(elementMove);
  if (elementMove.length > 0) {
    return
  }

  loseBody.querySelector('.lose-score span').textContent = scoreValue
  loseBody.classList.add('active')

}