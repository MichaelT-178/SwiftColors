const picker = new YAHOO.widget.ColorPicker("container", {
    showhsvcontrols: true,
    showhexcontrols: true,
    images: {
        PICKER_THUMB: "./pics/picker_thumb.png",
        HUE_THUMB: "./pics/hue_thumb.png"
    }
});

document.addEventListener("click", function() { 
    document.getElementById('currColor').value = "#" + picker.get("hex");
}); 

function convertToSwift(name, rgbString) {

    const rgb = rgbString.split(",");
    const num = 1/255;
    const red = (rgb[0] * num).toFixed(3);
    const gr = (rgb[1] * num).toFixed(3);
    const bl = (rgb[2] * num).toFixed(3);

    const normalString = `let ${name} = Color(red: ${red}, green: ${gr}, blue: ${bl})`;

    const UIString = `let ${name} = UIColor(red: ${red}, green: ${gr}, blue: ${bl}, alpha: 1)`
    const choice = document.getElementById("options").value;

    if (choice === "NormalColor") {
        navigator.clipboard.writeText(normalString);
    } else {
        navigator.clipboard.writeText(UIString);
    }

    return {n: name, r: red, g: gr,b: bl};
}

function isEmoji(str) {
    return /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi.test(str);
}

function isOnlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}

document.getElementById('gethex').addEventListener("click", function(e) { 

    const name = document.getElementById('namecolor').value;
    const rgbString = "" + picker.get("rgb");

    const color = convertToSwift(name, rgbString);

    const normalColor = 
    `<div id="theCode">  
    <span id="pink">let </span><span id="white">${color.n} = </span><span id="purple">Color</span><span id="white">(</span><span id="purple">red</span><span id="white">: </span><span id="yellow">${color.r}</span><span id="white">, </span><span id="purple">green</span><span id="white">: </span><span id="yellow">${color.g}</span><span id="white">, </span><span id="purple">blue</span><span id="white">: </span><span id="yellow">${color.b}</span><span id="white">)  </span><span id="green"> //Copied to clipboard!</span>   </div>`
    
    const UIColor = 
    `<div id="theCodeTwo">  
    <span id="pink">let </span><span id="white">${color.n} = </span><span id="purple">UIColor</span><span id="white">(</span><span id="purple">red</span><span id="white">: </span><span id="yellow">${color.r}</span><span id="white">, </span><span id="purple">green</span><span id="white">: </span><span id="yellow">${color.g}</span><span id="white">, </span><span id="purple">blue</span><span id="white">: </span><span id="yellow">${color.b}</span><span id="white">, </span><span id="purple">alpha</span><span id="white">: </span><span id="yellow">1</span><span id="white">)  </span><span id="green"> //Copied to clipboard!</span>   </div>`

    let text =  document.getElementById('thetext');
    let textTwo = document.getElementById('thetexttwo');

    function timeout(type, time) {

        const num = (time === "three") ? 3000 : 6000;

        if (type === "text") {
            setTimeout(function () {
                text.innerText = '';
                text.innerHTML = '';
            }, num); 
        } else {
            setTimeout(function () {
                textTwo.innerText = '';
            }, num); 

        }
    }

    if (name.trim() === "") {   
        textTwo.innerText = "";
        text.innerText = "Please enter a color name!";
        timeout("text", "three");
    } else if (!isOnlyLetters(name) && !isEmoji(name)) {
        text.innerHTML = "";
        textTwo.innerText = "Name can only be composed of letters or emojis!";
        timeout("textOne", "three");
    } else {
        textTwo.innerText = "";

        if (document.getElementById("options").value === "NormalColor") {
            text.innerHTML = normalColor;
        } else {
            text.innerHTML = UIColor;
        }
        
        timeout("text", "six");
    }
    
}); 