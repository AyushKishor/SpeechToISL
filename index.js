var speechRecognition = window.webkitSpeechRecognition;

var recognition = new speechRecognition();

var textbox = $("#textbox");

var instructions = $("#instructions")

var content = "";

recognition.continuous = true;

recognition.onstart = function () {
    content="";
    instructions.text("Voice Recognition is on!");
}

recognition.onspeechend = function () {
    instructions.text("Translation in Progress");
    var src = document.getElementById("image-container");
    src.innerHTML = "";
    var i;
    var n;
    var words = content.split(" ");
    

    for (i = 0; i < words.length; i++) {
            var newDiv = document.createElement("div");
            newDiv.className = "words";
            for (n = 0; n < words[i].length; n++) {
                var img = new Image();
                img.src = words[i][n].toLowerCase() + ".png" ;
                newDiv.appendChild(img); 
            }
            src.appendChild(newDiv);
    }
}

recognition.onerror = function () {
    instructions.text("Try Again");
}

recognition.onresult = function (event) {
    content = "";
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;

    content += transcript

    textbox.val(content);
}

$("#start-btn").click(function (event) {
    if (content.length) {
        content += ""
    }

    recognition.start();
})

$("#stop-btn").click(function (event) {
    recognition.stop();
})
