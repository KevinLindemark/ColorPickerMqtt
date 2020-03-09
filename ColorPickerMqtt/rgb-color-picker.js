/* https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation */
const rgbElement = document.querySelectorAll('.rgb');
const colorPicker = document.querySelector('.circle');

function pickerColor(r = 'red', g = 'green', b = 'blue') {
  colorPicker.style.background = `rgb(${r}, ${g}, ${b})`;
}

let rgbRed = 0;
let rgbGreen = 0;
let rgbBlue = 0;
function changeColor(id, event, rgb) {
  switch (id) {
    case 'red':
      rgbRed = rgb;
      event.target.style.background = `rgb(${rgbRed}, 0, 0)`;
      event.target.innerHTML = rgbRed;
      pickerColor(rgbRed, rgbGreen, rgbBlue);
      break;
    case 'green':
      rgbGreen = rgb;
      event.target.style.background = `rgb(0, ${rgbGreen}, 0)`;
      event.target.innerHTML = rgbGreen;
      pickerColor(rgbRed, rgbGreen, rgbBlue);
      break;
    case 'blue':
      rgbBlue = rgb;
      event.target.style.background = `rgb(0, 0, ${rgbBlue})`;
      event.target.innerHTML = rgbBlue;
      pickerColor(rgbRed, rgbGreen, rgbBlue);
      break;
    default:
      break;
  }
}

function saveColor() {
  console.log('rgb(', rgbRed, rgbGreen, rgbBlue, ')');
  colorPicker.innerHTML = `💾`;
  setTimeout(() => {
    colorPicker.innerHTML = '';
  }, 300);
}

document.addEventListener('click', saveColor);

function getColor(cordinate) {
  cordinate.addEventListener('mousemove', function (e) {
    const windowInnerWidth = window.innerWidth;
    const scalingFactor = 256 / windowInnerWidth;
    const rgbValue = Math.floor(e.clientX * scalingFactor);
    const elementId = e.currentTarget.id;

    const mouseCordX = e.clientX;
    const mouseCordY = e.clientY;
    colorPicker.style.top = `${mouseCordY - (colorPicker.clientHeight / 2)}px`;
    colorPicker.style.left = `${mouseCordX - (colorPicker.clientWidth / 2)}px`;

    changeColor(elementId, e, rgbValue)
  });
}

rgbElement.forEach(getColor);