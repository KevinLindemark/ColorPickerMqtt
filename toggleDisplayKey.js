function keyScript(event)
{
let x = event.which || event.keyCode;
if( x==32) //SPACEBAR pressed
{
    let sted = document.getElementById("indhold");
    
    if (sted.style.display != "none")
    sted.style.display  = "none";
    else
    sted.style.display  = "initial";
}
}

document.addEventListener("keypress", keyScript);