const rgbElement = document.querySelectorAll('.rgb');
const redElement = document.querySelector('#red');
const greenElement = document.querySelector('#green');
const blueElement = document.querySelector('#blue');
const colorPicker = document.querySelector('.circle');

const bodyElement = document.querySelector('body');
const bodyHeight = window.innerHeight;
const bodyWidth = window.innerWidth;
const divHeight = bodyHeight / 3;

function setDivHeight(event) {
  event.style.height = divHeight + "px";
}
rgbElement.forEach(setDivHeight);

function getAxisValue(axis) {
  if (axis === "x") {
    value = colorPicker.style.left;
  } else {
    value = colorPicker.style.top;
  }
  value = Number(value.slice(0, -2)).toFixed(0);
  value = Number(value);
  return value + colorPicker.clientHeight / 2;
}

function getRbgValue() {
  const scalingFactor = 255 / bodyWidth;
  const rgbValue = Math.floor(getAxisValue("x") * scalingFactor);
  return rgbValue;
}

function redGreenBlue(yPosition) {
  let rgbZone = '';
  if (yPosition < divHeight) {
    rgbZone = 'red'
  } else if (yPosition < (divHeight * 2)) {
    rgbZone = 'green'
  } else {
    rgbZone = 'blue'
  }
  return rgbZone;
}

function pickerColor(r = 'red', g = 'green', b = 'blue') {
  colorPicker.style.background = `rgb(${r}, ${g}, ${b})`;
}

let rgbRed = 0;
let rgbGreen = 0;
let rgbBlue = 0;
function changeColor(id, rgb) {
  switch (id) {
    case 'red':
      rgbRed = rgb;
      redElement.style.background = `rgb(${rgbRed}, 0, 0)`;
      redElement.innerHTML = rgbRed;
      pickerColor(rgbRed, rgbGreen, rgbBlue);
      break;
    case 'green':
      rgbGreen = rgb;
      greenElement.style.background = `rgb(0, ${rgbGreen}, 0)`;
      greenElement.innerHTML = rgbGreen;
      pickerColor(rgbRed, rgbGreen, rgbBlue);
      break;
    case 'blue':
      rgbBlue = rgb;
      blueElement.style.background = `rgb(0, 0, ${rgbBlue})`;
      blueElement.innerHTML = rgbBlue;
      pickerColor(rgbRed, rgbGreen, rgbBlue);
      break;
    default:
      break;
  }
}

function saveColor() {
  console.log('rgb(', rgbRed, rgbGreen, rgbBlue, ')');
  colorPicker.innerHTML = `ðŸ’¾`;
  setTimeout(() => {
    colorPicker.innerHTML = '';
  }, 300);
}
document.addEventListener('click', saveColor);

function handleOrientation(event) {
  let x = event.beta * 5;  // In degree in the range [-180,180]
  let y = event.gamma * 3; // In degree in the range [-90,90]

  // console.log('beta', x, 'gamma', y);

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x > 90) { x = 90 };
  if (x < -90) { x = -90 };
  if (y > 90) { y = 90 };
  if (y < -90) { y = -90 };

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  colorPicker.style.top = (bodyHeight * x / 180 - (colorPicker.clientHeight / 2)) + "px";
  colorPicker.style.left = (bodyWidth * y / 180 - (colorPicker.clientWidth / 2)) + "px";

  changeColor(redGreenBlue(getAxisValue("y")), getRbgValue(getAxisValue("x")));
}

window.addEventListener('deviceorientation', handleOrientation);