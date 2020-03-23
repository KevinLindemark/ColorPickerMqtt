window.addEventListener('click', () => {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // iOS 13+
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response == 'granted') {
          window.addEventListener('deviceorientation', (e) => {
            deviceorientationPermission = true;
          })
        }
      })
      .catch(console.error)
  } else {
    // non iOS 13+
  }
});