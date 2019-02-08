//ALPHA VERSION PLAN
//1. Input word
//2. Grab each character. (array)
//3. Split it in four pieces (array of arrays)
//4. Get a piece from each character and swap it with one of the next.  

//Improvements
//Step 3. 'Randomize' the splitting, changing angle.
//Step 4. 'Randomize' the amount of pieces that get swapped. 

var variation = 0;
var wrapper;
var headline = "";
var positions = ["top-left", "top-right", "bot-left", "bot-right"]
var k = 0;
var i = 0;
var variationLevel = 0; //0 to 100 -- higher => crazier results
var news;
var source;
var refreshRate = 15000;

//NEWS API
var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=492d86d650b14a0598ee2feb11abaffd';

var req = new Request(url);
news = fetch(req).then(function (response) {
        return response.json();
      }).then(function(jsonData){
        news = jsonData;
        initFunction();
      });


//INITIALISE
function initFunction() {
    
    headline = news.articles[k].title;
    source = headline.substring(headline.indexOf(" - "));
    headline = Array.from(headline.substring(0 , headline.indexOf("-")));
    wrapper = document.getElementById('headline-container');
    document.getElementById('source').innerHTML = source;

    generateHeadline();

    //KEY PRESS FOR PC
    
    document.onkeypress = function() {
        handleKeyPress();
    }; 

    document.onkeyup = function() {
        wrapper.classList.remove('shake');
    }; 

    //SHAKE FOR PHONES
    
    var shakeEvent = new Shake({threshold: 15});
    shakeEvent.start();
    window.addEventListener('shake', function(){
      handleKeyPress();
      //alert("Shaked");
    }, false);

}

//Creates div for each character
function handleKeyPress(){
    destroyNews();
    wrapper.classList.add('shake');
    variationLevel = variationLevel + 5;
    document.getElementById('overlay').style.display = "none";
    generateHeadline();
}


function generateHeadline() {
    for (i = 0; i < headline.length; i++) {
        var character = document.createElement('div');
        wrapper.appendChild(character);
        character.classList.add("char");
        character.classList.add("clearfix");
        for (var j = 0; j < positions.length; j++) {
            createPiece(character, positions[j], generateVariation(variationLevel));
        }
    }
}

//Creates div for each piece 
function createPiece(character, position, variation) {        
    var piece = document.createElement('div');        
    piece.classList.add("piece");        
    piece.classList.add(position);   
    var index = i+variation;     
    piece.innerHTML = headline[index].toUpperCase();        
    character.appendChild(piece);        
}         


function generateVariation(variationLevel){
    var random = Math.floor(Math.random()*(100-1+1)+1);

    if (random < variationLevel){
        variation = Math.floor(Math.random()*(4-1+1)+1);;
    } else {
        variation = 0;
    }
    return variation;
}


function destroyNews(){
    while(wrapper.firstChild){
        wrapper.removeChild(wrapper.firstChild);
    }
}


//every
 window.setInterval(function(){
    
    if (k == news.articles.length - 1){
        k = 0;
    } else {
        k++;
    }
    
    variationLevel = 0;
    destroyNews();
    initFunction();

}, refreshRate)


