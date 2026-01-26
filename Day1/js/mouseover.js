const hotPlaces = document.querySelectorAll('.li');
function onMouseOver(event) {
  const mouseover = 'mouseover';
  if (!event.currentTarget.classList.contains(mouseover)) {
    // currentTarget
    event.currentTarget.classList.add(mouseover);
  }
}

function onMouseOut(event) {
  const mouseover = 'mouseover';
  event.currentTarget.classList.remove(mouseover);
}

hotPlaces.forEach((place) => {
  place.addEventListener('mouseover', onMouseOver);
  place.addEventListener('mouseout', onMouseOut);
});
