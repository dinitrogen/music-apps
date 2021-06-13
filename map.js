const staffDiv = document.querySelector('.staffDiv');
const gameMap = document.querySelector('.gameMap');
const notesLibrary = ['A','B','C','D','E','F','G'];
let notesList = [];
let correctAnswer = getRandomNote();
let gridSize = 3;
let gridArea = gridSize ** 2;


const newQuestionButton = document.querySelector('#newQuestion');
newQuestionButton.addEventListener('click', function() {
    correctAnswer = getRandomNote();
    generateNotesList(gridArea);
    populateMap(gridArea);
    staffDiv.textContent = `Find this note: "${correctAnswer}"`
    console.log(correctAnswer);
});


function drawGrid() {
    while (gameMap.firstChild) {
        gameMap.removeChild(gameMap.lastChild);
    }

    for  (i = 0; i < gridArea; i++) {
        const gameTile = document.createElement('div');
        gameTile.classList = 'gameTile';
        gameTile.setAttribute('id',`tile${i}`)
        gameMap.appendChild(gameTile);

        gameTile.addEventListener('click', function() {
            if (this.textContent === correctAnswer) {
                this.textContent = 'Correct!';
            } else {
                this.textContent = 'Wrong!';
            }
            // TODO: remove the event listener to disable further clicks 
        });
    }
}


function generateNotesList(numTiles) {
    notesList[0] = correctAnswer;

    for (i = 1; i < numTiles; i++) {
        notesList[i] = getRandomNote();
    }
    notesList = shuffleNotesArray(notesList);
    return notesList;
}


function populateMap(numTiles) {
    for (i = 0; i < numTiles; i++) {
        document.getElementById(`tile${i}`).textContent = notesList[i];
    }
}


function getRandomNote() {
    let randomNote = notesLibrary[Math.floor(Math.random() * 7)];
    return randomNote;
}


function shuffleNotesArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


staffDiv.textContent = `Find this note: "${correctAnswer}"`
drawGrid();
generateNotesList(gridArea);
populateMap(gridArea);

