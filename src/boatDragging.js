function dragging() {
  let boat = document.querySelectorAll('.draggableBoat');
  let container = document.querySelectorAll('.gridSquare');

  container.forEach((square) => {
    square.addEventListener('dragover', (event) => {
      let dragElement = document.getElementsByClassName('dragging')[0];
      square.appendChild(dragElement);
    });
  });

  boat.forEach((e) => {
    e.addEventListener('dragstart', () => e.classList.add('dragging'));
    e.addEventListener('dragend', () => {
      e.classList.remove('dragging');
    });
  });
}

export { dragging };
