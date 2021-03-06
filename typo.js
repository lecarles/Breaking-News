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
const headlines =
    [
        {
            title: "Coronavirus: How Europeans are preparing for Christmas and New Year",
            source: "BBC.com"
        },
        {
            title: "National Geographic reveals its best destinations for 2021",
            source: "CNN"
        },
        {
            title: "Spain's unemployment rate leaps to 16 percent amid coronavirus crisis",
            source: "The Local"
        },
        {
            title: "UK aid budget cuts undermine trust ahead of Cop26 summit, experts warn",
            source: "Climate Home News"
        },
        {
            title: "Armenians flee Nagorno-Karabakh after brutal war with Azerbaijan",
            source: "The Guardian"
        },
        {
          title: "Trump falsely claims victory - 'The campaign, which I won, by the way'",
          source: "BBC.com"
        }
    ];

document.onkeypress = function() {
    document.getElementById('overlay').style.display = "none";
}; 
initFunction();

//INITIALISE
function initFunction() {
    headline = headlines[k].title;
    source = headlines[k].source;
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

window.setInterval(function(){
    
    if (k == headlines.length - 1){
        k = 0;
    } else {
        k++;
    }
    
    variationLevel = 0;
    destroyNews();
    initFunction();

}, refreshRate)


