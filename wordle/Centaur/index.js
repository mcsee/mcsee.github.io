 const response = await fetch("/dictionary.txt");
 const dictionary = await response.text();
 const words = dictionary.split(/\r?\n/).map((string) => new Word(string));

 var randomIndex = Math.floor(Math.random() * words.length);
 var winnerWord = words[randomIndex];

 var game = new Game(words, winnerWord);   

// Step 1
/* create a table with 6 rows and 5 columns */

var table = document.createElement('table');
table.setAttribute('border','1');
for (var i = 0; i < 6; i++) {
  var row = document.createElement('tr');
  for (var j = 0; j < 5; j++) {
    var cell = document.createElement('td');
    cell.innerHTML = '<b>' + (i * 5 + j) + '</b>';
    row.appendChild(cell);
  }
  table.appendChild(row);
}
document.body.appendChild(table);


// Step 2
/* Cells are grey, squared of 80px 80px */

var cells = table.getElementsByTagName('td');
for (var i = 0; i < cells.length; i++) {
  cells[i].style.backgroundColor = '#ccc';
  cells[i].style.width = '80px';
  cells[i].style.height = '80px';
}


// Step 3
/* cells are half size */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.width = '40px';
  cells[i].style.height = '40px';
}


// Step 4
/* there are no borders */

table.style.border = 'none';


// Step 5
/* Cells have no border */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.border = 'none';
}


// Step 6
/* Text is centered */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.textAlign = 'center';
}


// Step 7
/* text is white */
for (var i = 0; i < cells.length; i++) {
  cells[i].style.color = 'white';
}


// Step 8
/* text is font helvetica and bold */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.fontFamily = 'Helvetica';
  cells[i].style.fontWeight = 'bold';
}


// Step 9
/* cells have no padding */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.padding = '0px';
}


// Step 10
/* cells are empty */

for (var i = 0; i < cells.length; i++) {
  cells[i].innerHTML = '';
}


// Step 11
/* add an input text field under the table */

var input = document.createElement('input');
input.setAttribute('type','text');
input.setAttribute('placeholder','Write Something');
input.id = 'input';
document.body.appendChild(input);


// Step 12
/* add margin reduce text field width to 100px */

input.style.margin = '10px';
input.style.width = '100px';


// Step 13
/*add a button by the field with 'tick' character. Button must have un id named 'validate' */

var button = document.createElement('button');
button.innerHTML = '&#10003;';
button.id = 'validate';
document.body.appendChild(button);


//Step14
/* add another button with id 'remove' and the 'x' character as label */

var button = document.createElement('button');
button.innerHTML = '&#10007;';
button.id = 'remove';
document.body.appendChild(button);

// Step 14 bis
/* add an input text field under the table */

var status = document.createElement('input');
status.setAttribute('type','text');
status.setAttribute('placeholder','');
status.id = 'status';
status.readOnly = true;
document.body.appendChild(status);
status.style.margin = '10px';
status.style.width = '300px';

// Step 15
/* center box text */

input.style.textAlign = 'center';


// Step 16
/* we cannot write more than 5 characters in the input field */

input.setAttribute('maxlength','5');


// Step 17
/* create variable named 'rowindex' starting at 0 */

var rowIndex = game.wordsAttempted().length;

// Step 18
/* when entering text in the box, convert it to uppercase */

input.addEventListener('keyup', function(event) { 
  event.target.value = event.target.value.toUpperCase();
});				   


// Step 20

/* after writing on the text field, the value from every character will be writen on each cell of the selected row */
input.addEventListener('keyup', function(event) {
  var cells = document.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {  
	if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {    
	  cells[i].innerHTML = input.value.charAt(i - rowIndex * 5);
    }
  }
});

// Step 24
	  
/* when clicking validate button we add an attempt */

document.getElementById('validate').addEventListener('click', function(event) {
  var cells = document.querySelectorAll('td');
  var currentLetters = '';
  for (var i = 0; i < cells.length; i++) {
    if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {
        currentLetters += cells[i].innerHTML ;
    }
  }  
  var status = document.getElementById('status');
  status.value = '';
  try { 
    var attempt = new Word(currentLetters);
    game.addAttempt(attempt);  
  }
  catch (error) { 
    status.value = error.message; 
    return;
  }  

  var correctMatches = attempt.matchesPositionWith(winnerWord); 
  var incorrectMatches = attempt.matchesIncorrectPositionWith(winnerWord); 
  
  for (var i = rowIndex * 5; i < (rowIndex + 1) * 5; i++) { 
    if (correctMatches.includes(i-(rowIndex * 5)+1)) { 
        cells[i].style.backgroundColor = '#aedb95'; 
    }
    if (incorrectMatches.includes(i-(rowIndex * 5)+1)) { 
        cells[i].style.backgroundColor = '#edc953'; 
    }
  }
  if (game.hasWon()){
     status.value = 'Congratulations. You won!';
  }
  if (game.hasLost()){
     status.value = 'Sorry. You have lost! Correct word was ' + winnerWord.word();
  }
  document.getElementById('input').value = '';
  rowIndex = game.wordsAttempted().length;
});


// Step 25

/* when pushing remove button, every letter is erased, rowIndex goes to 0 and all cells turn gray */ 

document.getElementById('remove').addEventListener('click', function(event) {
  var cells = document.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].style.backgroundColor = '#ccc';
  }
  rowIndex = 0;    
  document.getElementById('input').value = '';
  document.getElementById('status').value = ''
});

// Step 27

/* when pressing remove, chose randomly the secret word from the words collection */ 

document.getElementById('remove').addEventListener('click', function(event) {
  var randomIndex = Math.floor(Math.random() * words.length);
  winnerWord = words[randomIndex];
  game = new Game(words, winnerWord);   
});
