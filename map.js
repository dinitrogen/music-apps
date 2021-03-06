const staffDiv = document.querySelector('.staffDiv');
const gameMap = document.querySelector('.gameMap');
const notesLibrary = ['A','B','C','D','E','F','G'];
let notesList = [];
let correctAnswer = getRandomNote();
let gridSize = 3;
let gridArea = gridSize ** 2;
let activeTileIndex = 0;
let activeTile;


const newQuestionButton = document.querySelector('#newQuestion');
newQuestionButton.addEventListener('click', function() {
    correctAnswer = getRandomNote();
    generateNotesList(gridArea);
    populateMap(gridArea);
    staffDiv.textContent = `Find this note: "${correctAnswer}"`
    console.log(correctAnswer);
});

document.addEventListener('keydown', movePlayer)


function movePlayer(event) {
    if (event.code === "ArrowLeft") {
        console.log("left");
        if (activeTileIndex === 0 || activeTileIndex % gridSize === 0) {
            return;
        } else {
            activeTile.classList.remove('activeTile');
            activeTileIndex--;
        }
    } else if (event.code === "ArrowRight") {
        console.log("right");
        if (activeTileIndex === gridArea - 1 || (activeTileIndex + 1) % gridSize === 0) {
            return;
        } else {
            activeTile.classList.remove('activeTile');
            activeTileIndex++;
        }
    } else if (event.code === "ArrowUp") {
        console.log("up");
        if (activeTileIndex < gridSize) {
            return;
        } else {
            activeTile.classList.remove('activeTile');
            activeTileIndex = activeTileIndex - gridSize;
        }
    } else if (event.code === "ArrowDown") {
        console.log("down");
        if (activeTileIndex >= gridArea - gridSize) {
            return;
        } else {
            activeTile.classList.remove('activeTile');
            activeTileIndex = activeTileIndex + gridSize;
        }
    } else if (event.code === "Space") {
        return; // TODO 
    } else {
        return;
    }
    activeTile = document.querySelector(`#tile${activeTileIndex}`);
    activeTile.classList.add('activeTile');
}


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
    activeTile = document.querySelector('#tile0');
    activeTile.classList.add('activeTile');
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


