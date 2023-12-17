/*
File: index.html
GUI Assignment: HW5
Zachary Gilbert, UMass Lowell Computer Science,
Zachary_Gilbert@student.uml.edu
Copyright (c) 2023 by Zachary Gilbert. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by ZG on December 15, 2023 at 11:30 AM
*/

var boardElements = 0;//Keeps track of how many tiles are on the screen
//Json was used from the zip the professor provided
const jsonString = '{"pieces":[{"letter":"A","value":1,"amount":9},{"letter":"B","value":3,"amount":2},{"letter":"C","value":3,"amount":2},{"letter":"D","value":2,"amount":4},{"letter":"E","value":1,"amount":12},{"letter":"F","value":4,"amount":2},{"letter":"G","value":2,"amount":3},{"letter":"H","value":4,"amount":2},{"letter":"I","value":1,"amount":9},{"letter":"J","value":8,"amount":1},{"letter":"K","value":5,"amount":1},{"letter":"L","value":1,"amount":4},{"letter":"M","value":3,"amount":2},{"letter":"N","value":1,"amount":5},{"letter":"O","value":1,"amount":8},{"letter":"P","value":3,"amount":2},{"letter":"Q","value":10,"amount":1},{"letter":"R","value":1,"amount":6},{"letter":"S","value":1,"amount":4},{"letter":"T","value":1,"amount":6},{"letter":"U","value":1,"amount":4},{"letter":"V","value":4,"amount":2},{"letter":"W","value":4,"amount":2},{"letter":"X","value":8,"amount":1},{"letter":"Y","value":4,"amount":2},{"letter":"Z","value":10,"amount":1},{"letter":"Blank","value":0,"amount":2}]}';
const jsonObject = JSON.parse(jsonString);
const piecesArray = jsonObject.pieces;
let currentScore = 0; 
//Letter Array has all availabe letters, makes it easier to use to look up in the jsonString what their values are and also for instantiating the letter elements
var Letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "Blank"];
$(document).ready(function(){
    //When the document is finished loading, start the generation of letters
    GenerateStartingLetters();
});
function onDone(){ //Once the letters are done being generated, the game is ready to play
    $(".draggable_box ").draggable({//allows the user to snap to board tile or a hand tile
        snap:"#snapPoint , .handSnap",
        snapMode: "inner",//we want to snap to the inner of the snap point
        snapTolerance: 40,//when the piece starts to snap
    });
    $("#snapPoint, .handSnap").droppable({
        accept: ".draggable_box", //Allows the tiles to be dropped on the tile points
        drop: function(event, ui) { //when dropped it checks a few things, mostly the score value
            var letter = ui.draggable.attr('alt');//gets the letter from the attribute
            const value = getLetterValue(letter);//gets the value of that letter
    
            // Check if the droppable spot is already occupied
            if ($(this).attr('name') === "Occupied") {//if the tile is already occupied by a piece, return the piece back to where it was
                ui.draggable.animate(ui.draggable.data('uiDraggable').originalPosition, "slow"); // Manually revert
                return; // Prevent further processing
            }


            //Removes Scoring when tile taken off
            if($(this).hasClass('handSnap') && ui.draggable.val("id", ui.draggable).attr('value') == 1) { //This checks to see if the tile is not on a bonus tile
                ui.draggable.attr('name', 'notOccupied');//if it is, label the point it was on, that it is no longer occupied when the piece is brought back to the hand
                UpdateScore(-value);//remove the value of the letter from the score
                ui.draggable.attr('id', 'onHand');//set the id of the piece to onHand
                boardElements--;//Decrease the total amount of board pieces
            }
            else if($(this).hasClass('handSnap') && ui.draggable.val("id", ui.draggable).attr('value') == 2) { //Checks to see if it was a bonus letter
                UpdateScore(-value*2);//if it was remove the value of the letter from score
                ui.draggable.attr('name', 'notOccupied');//if it is, label the point it was on, that it is no longer occupied when the piece is brought back to the hand
                ui.draggable.attr('id', 'onHand');//set the id of the piece to onHand
                boardElements--;//Decrease the total amount of board pieces
            }
            else if($(this).hasClass('handSnap') && ui.draggable.val("id", ui.draggable).attr('value') == 3) {//Checks to see if it was a bonus word
                removeDoubleScore(letter);
                ui.draggable.attr('name', 'notOccupied');//if it is, label the point it was on, that it is no longer occupied when the piece is brought back to the hand
                ui.draggable.attr('id', 'onHand');//set the id of the piece to onHand
                boardElements--;//Decrease the total amount of board pieces
            }   
            //Scoring
            if(['snapPoint7', 'snapPoint9'].some(c => $(this).hasClass(c)) && !$(this).hasClass('handSnap')) {//Checks to see if the tile being dropped is a bonus letter
                ui.draggable.attr('value', '2');//sets the value of the letter element for future use
                UpdateScore(value * 2);//Update the score with the double value
                ui.draggable.attr('id', 'onBoard');//tells other checkings to see if the piece is onBoard
                boardElements++;//increase board elements 
                $(this).attr('name', 'Occupied'); // Mark this snap point as occupied
            } else if (!$(this).hasClass('handSnap')) {
                ui.draggable.attr('value', '1');//sets the value of the letter element for future use
                UpdateScore(value);//Update the score with the regular value
                ui.draggable.attr('id', 'onBoard');//tells other checkings to see if the piece is onBoard
                boardElements++;//increase board elements 
                $(this).attr('name', 'Occupied'); // Mark this snap point as occupied
            }
            if(['snapPoint3', 'snapPoint13'].some(c => $(this).hasClass(c)) && !$(this).hasClass('handSnap')) {
                ui.draggable.attr('value', '3');//sets the value of the letter element for future use
                doubleScore();//Update the score with the double word value
                ui.draggable.attr('id', 'onBoard');//tells other checkings to see if the piece is onBoard
                boardElements++;//increase board elements 
                $(this).attr('name', 'Occupied'); // Mark this snap point as occupied
            }

        }
    });
}
function GenerateStartingLetters() {
    let iter = 0;
    var offset = 1;
    while(true) {
        if(iter < 7) {//checks to see if 7 tiles have been fully generated
            var num = Math.floor(Math.random() * (Letters.length));//creates a number for getting a letter, by taking how many letters can be used 
            var letter = Letters[num];
            var letterSelect = piecesArray.find(piece => piece.letter === letter)
            if(letterSelect.amount > 0) {//checks to see if that letter can be used depending on the amount of those letters
                $('#snapHand'+offset).append('<img value = "1" name = "handElements" id = "onHand" class="draggable_box" src = "Scrabble_Tiles/Scrabble_Tile_'+ Letters[num]+ '.jpg" alt= "' + Letters[num] +'">');
                iter++;//tells it that we have a valid letter
                offset++;//allows different uniquely identifiable letter elements
                letterSelect.amount--;//decrease how many of that letter can be used left
            }
        }
        else {
            break;
        }
    }
    onDone();//start game
}
function newLetters() { //Creates new letters on the board
    //clear hand
    var handElements = document.getElementsByName("handElements");//gets availabe hand elements
    var totalElements = handElements.length;//gets the count of how many there are
    remainingElements = totalElements - boardElements;//calculates the remaining elements
    //alert(remainingElements);
    for(var i= 0; i < remainingElements; i++) { //removes the old hand
        $("#onHand").remove();
    }
    //New letters
    generateRemainingLetter(remainingElements);//creates the new hand
}
function generateRemainingLetter(count) { //creates a remaining amount of hand elements, same logic as GenerateStartingLetters() but with a count of how many should be done
    let iter = 0; 
    var offset = 1;
    while(true) {
        if(iter < count) {
            var num = Math.floor(Math.random() * (Letters.length));
            var letter = Letters[num];
            var letterSelect = piecesArray.find(piece => piece.letter === letter)
            if(letterSelect.amount > 0) {
                $('#snapHand'+offset).append('<img name = "handElements" id = "onHand" class="draggable_box" src = "Scrabble_Tiles/Scrabble_Tile_'+ Letters[num]+ '.jpg" alt= "' + Letters[num] +'">');
                iter++;
                offset++;
            }
        }
        else {
            break;
        }
    }
    onDone();//load game logic
}
function removeDoubleScore (letter) { //removes the double score
    letterScore = getLetterValue(letter)
    currentScore -= (currentScore / 2) - letterScore;
    $("#score").html(currentScore);
}
function doubleScore() {//adds a double score
    currentScore = currentScore * 2;
    $("#score").html(currentScore);
}
function UpdateScore(value) {//adds a normal letter score
    //console.log(value);
    currentScore += value;
    $("#score").html(currentScore);
}
function getLetterValue(letter) { //gets the letter value from the json Object and returns that value
    const pieceObject = piecesArray.find(piece => piece.letter === letter);
    if(pieceObject) {
        return pieceObject.value;
    } else {
        return null;
    }
}
function startOver(){//New game
    location.reload();
}