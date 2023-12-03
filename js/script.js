var boardElements = 0;
const jsonString = '{"pieces":[{"letter":"A","value":1,"amount":9},{"letter":"B","value":3,"amount":2},{"letter":"C","value":3,"amount":2},{"letter":"D","value":2,"amount":4},{"letter":"E","value":1,"amount":12},{"letter":"F","value":4,"amount":2},{"letter":"G","value":2,"amount":3},{"letter":"H","value":4,"amount":2},{"letter":"I","value":1,"amount":9},{"letter":"J","value":8,"amount":1},{"letter":"K","value":5,"amount":1},{"letter":"L","value":1,"amount":4},{"letter":"M","value":3,"amount":2},{"letter":"N","value":1,"amount":5},{"letter":"O","value":1,"amount":8},{"letter":"P","value":3,"amount":2},{"letter":"Q","value":10,"amount":1},{"letter":"R","value":1,"amount":6},{"letter":"S","value":1,"amount":4},{"letter":"T","value":1,"amount":6},{"letter":"U","value":1,"amount":4},{"letter":"V","value":4,"amount":2},{"letter":"W","value":4,"amount":2},{"letter":"X","value":8,"amount":1},{"letter":"Y","value":4,"amount":2},{"letter":"Z","value":10,"amount":1}]}';
const jsonObject = JSON.parse(jsonString);
const piecesArray = jsonObject.pieces;
let currentScore = 0;    
var Letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
$(document).ready(function(){
    GenerateStartingLetters();
});
function onDone(){
    $(".draggable_box ").draggable({
        snap:"#snapPoint ",
        snapMode: "inner",
        revert: "invalid",
        snapTolerance: 40,
    });
    $("#snapPoint ").droppable({
        accept: ".draggable_box",
        reject: "#handSnap1",
        drop: function(event, ui) {
            var letter = ui.draggable.val("id", ui.draggable).attr('alt');
            ui.draggable.attr('id', 'onBoard');
            boardElements++;
            const value = getLetterValue(letter);
            // $(this).attr('name', 'Occupied');
            // console.log($('#snapPoint').attr('name'));
            // $("#snapPoint").attr('name', 'Occupied').droppable("disable");
            if($(this).hasClass('snapPoint3') || $(this).hasClass('snapPoint7') || $(this).hasClass('snapPoint9') || $(this).hasClass('snapPoint13')) {
                UpdateScore(value*2);
            }
            else {
                UpdateScore(value);
            }
        }
    });
}
function GenerateStartingLetters() {
    let iter = 0;
    var offset = 1;
    while(true) {
        if(iter < 7) {
            var num = Math.floor(Math.random() * (Letters.length));
            var letter = Letters[num];
            var letterSelect = piecesArray.find(piece => piece.letter === letter)
            if(letterSelect.amount > 0) {
                $('#snapHand'+offset).append('<img value = "0" name = "handElements" id = "onHand" class="draggable_box" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[num]+ '.jpg" alt= "' + Letters[num] +'">');
                iter++;
                offset++;
            }
        }
        else {
            break;
        }
    }
    onDone();
}
function newLetters() {
    //clear hand
    var handElements = document.getElementsByName("handElements");
    var totalElements = handElements.length;
    remainingElements = totalElements - boardElements;
    //alert(remainingElements);
    for(var i= 0; i < remainingElements; i++) {
        $("#onHand").remove();
    }
    //New letters
    generateRemainingLetter(remainingElements);
}
function generateRemainingLetter(count) {
    let iter = 0;
    var offset = 1;
    while(true) {
        if(iter < count) {
            var num = Math.floor(Math.random() * (Letters.length));
            var letter = Letters[num];
            var letterSelect = piecesArray.find(piece => piece.letter === letter)
            if(letterSelect.amount > 0) {
                $('#snapHand'+offset).append('<img name = "handElements" id = "onHand" class="draggable_box" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[num]+ '.jpg" alt= "' + Letters[num] +'">');
                iter++;
                offset++;
            }
        }
        else {
            break;
        }
    }
    onDone();
}
function UpdateScore(value) {
    //console.log(value);
    currentScore += value;
    $("#score").html(currentScore);
}
function getLetterValue(letter) {
    const pieceObject = piecesArray.find(piece => piece.letter === letter);
    if(pieceObject) {
        return pieceObject.value;
    } else {
        return null;
    }
}
function startOver(){
    location.reload();
}