
    //generate 7 letters in an array
    // Your JSON string
const jsonString = '{"pieces":[{"letter":"A","value":1,"amount":9},{"letter":"B","value":3,"amount":2},{"letter":"C","value":3,"amount":2},{"letter":"D","value":2,"amount":4},{"letter":"E","value":1,"amount":12},{"letter":"F","value":4,"amount":2},{"letter":"G","value":2,"amount":3},{"letter":"H","value":4,"amount":2},{"letter":"I","value":1,"amount":9},{"letter":"J","value":8,"amount":1},{"letter":"K","value":5,"amount":1},{"letter":"L","value":1,"amount":4},{"letter":"M","value":3,"amount":2},{"letter":"N","value":1,"amount":5},{"letter":"O","value":1,"amount":8},{"letter":"P","value":3,"amount":2},{"letter":"Q","value":10,"amount":1},{"letter":"R","value":1,"amount":6},{"letter":"S","value":1,"amount":4},{"letter":"T","value":1,"amount":6},{"letter":"U","value":1,"amount":4},{"letter":"V","value":4,"amount":2},{"letter":"W","value":4,"amount":2},{"letter":"X","value":8,"amount":1},{"letter":"Y","value":4,"amount":2},{"letter":"Z","value":10,"amount":1}]}';

// Parse the JSON string into a JavaScript object
const jsonObject = JSON.parse(jsonString);

// Access the "pieces" array
const piecesArray = jsonObject.pieces;

// Loop through the array and access each object's properties
// piecesArray.forEach(piece => {
//   console.log(`Letter: ${piece.letter}, Value: ${piece.value}, Amount: ${piece.amount}`);
// });

    var Letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    //alert(Letters[0]);

    //create a draggable element for each letter
     
    $('#lettersDraggable').append('<img id = "letterBox" class="draggable_box box1" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[0]+ '.jpg">');
    $('#lettersDraggable').append('<img id = "letterBox" class="draggable_box box1" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[0]+ '.jpg">');
    $('#lettersDraggable').append('<img id = "letterBox" class="draggable_box box1" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[0]+ '.jpg">');
    $('#lettersDraggable').append('<img id = "letterBox" class="draggable_box box1" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[0]+ '.jpg">');
    $('#lettersDraggable').append('<img id = "letterBox" class="draggable_box box1" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[0]+ '.jpg">');
    $('#lettersDraggable').append('<img id = "letterBox" class="draggable_box box1" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[0]+ '.jpg">');
    $('#lettersDraggable').append('<img id = "letterBox" class="draggable_box box1" src = "/Scrabble_Tiles/Scrabble_Tile_'+ Letters[0]+ '.jpg">');

$(".draggable_box").draggable({
    snap:"#snapPoint ",
    snapMode: "inner",
});
function GenerateRandomLetter(){

}