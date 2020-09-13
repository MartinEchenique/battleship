import { events } from './pubSub';
function dragging() {
  let boats = document.querySelectorAll('.draggableBoat');
  let container = document
    .getElementById('playerOneBoard')
    .querySelectorAll('.gridSquare');
  container.forEach((square) => {
    square.addEventListener('dragover', (event) => event.preventDefault());
    square.addEventListener('dragenter', (event) => {
      event.preventDefault();
      let dragging = document.getElementsByClassName('dragging')[0];
      let lenght = +dragging.dataset.squares;
      if (isDropValid(square, lenght)) {
        square.classList.add('validDrop');
      } else {
        square.classList.add('invalidDrop');
      }
    });
    square.addEventListener('dragleave', () => {
      square.classList.remove('invalidDrop');
      square.classList.remove('validDrop');
    });
    square.addEventListener('drop', () => {
      let dragging = document.getElementsByClassName('dragging')[0];
      let lenght = +dragging.dataset.squares;
      square.classList.remove('invalidDrop');
      square.classList.remove('validDrop');
      if (isDropValid(square, lenght)) {
        dragging.remove();
        let dropCoordinates = getGridCoordinates(square);
        events.emit('boat dragged and dropped', [dropCoordinates, lenght]);
        if (document.querySelectorAll('.draggableBoat').length === 0) {
          events.emit('all boats droped', null);
        }
        return [dropCoordinates, lenght];
      }
    });
  });

  boats.forEach((e) => {
    e.addEventListener('dragstart', () => e.classList.add('dragging'));
    e.addEventListener('dragend', () => e.classList.remove('dragging'));
  });
  function getGridCoordinates(square) {
    let data = square.dataset.coordinates;
    data = square.dataset.coordinates.split(',');
    return data;
  }
  function isDropValid(square, lenght) {
    let coordinates = getGridCoordinates(square);
    if (+coordinates[1] + lenght < 11) {
      return true;
    }
    return false;
  }
}

export { dragging };
