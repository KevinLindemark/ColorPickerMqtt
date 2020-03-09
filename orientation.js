let old_val = 0;

function handleOrientation(event) {
let val = event.alpha;
val = Math.floor(val);
val = Math.abs(val); // fjern evt minus foran
document.getElementById("visOrientering").innerHTML = val;


// til kode til at spare båndbredde ------------------

// hvad er forskelle mellem vinklen nu og sidste gang vi sendte?
let forskel = Math.abs(old_val - val);

// hvis forskellen er større end 5, så sender vi
if (forskel > 15)
{
// send value via MQTT
sendMQTT(val);
old_val = val; 
}

}


function startOrientation()  
{
	//Start-button pressed - so lets hide the button
document.getElementById("startklik").style.display = "none";

// check if it is IOS13 device   
if (typeof DeviceOrientationEvent.requestPermission === 'function') 
	{
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
			if (permissionState === 'granted') 
		  {
            window.addEventListener("deviceorientation", handleOrientation, false);
          }
        })
        .catch(console.error);
    } 
	else //NON IOS device - just add the eventlistner
	{
    window.addEventListener("deviceorientation", handleOrientation, false);
    }
  }