var current_moves = 0;
var currentTime = 0;
var music;
var bestTime = Number.MAX_SAFE_INTEGER;
var bestMove = Number.MAX_SAFE_INTEGER;

function swapTiles(cell1, cell2) {
	var temp = document.getElementById(cell1).className;
	document.getElementById(cell1).className = document.getElementById(cell2).className;
	document.getElementById(cell2).className = temp;
}

function startTimer() {
	setInterval(function () {
		currentTime++;
		span = document.getElementById("time");
		span.innerHTML = currentTime;

	}, 1000);
}

function newGame() {
	let blankTileRow = 4;
	let blankTileCol = 4;
	let selectedTileRow;
	let selectedTileCol;
	for (let i = 0; i < 1000; i++) {
		if (Math.floor(Math.random() * 2) == 0) {
			if (blankTileRow == 1) {
				if (Math.floor(Math.random() * 2) == 0) {
					selectedTileRow = 1;
				} else {
					selectedTileRow = 2;
				}
			} else if (blankTileRow == 2) {
				if (Math.floor(Math.random() * 2) == 0) {
					selectedTileRow = 1;
				} else {
					selectedTileRow = 3;
				}
			} else if (blankTileRow == 3) {
				if (Math.floor(Math.random() * 2) == 0) {
					selectedTileRow = 2;
				} else {
					selectedTileRow = 4;
				}
			} else if (blankTileRow == 4) {
				if (Math.floor(Math.random() * 2) == 0) {
					selectedTileRow = 3;
				} else {
					selectedTileRow = 4;
				}
			}
			selectedTileCol = blankTileCol;
		} else {

			if (blankTileCol == 1) {
				if (Math.floor(Math.random() * 2) == 0) {
					selectedTileCol = 1;
				} else {
					selectedTileCol = 2;
				}
			} else if (blankTileCol == 2) {
				if (Math.floor(Math.random() * 2) == 0) {
					selectedTileCol = 1;
				} else {
					selectedTileCol = 3;
				}
			} else if (blankTileCol == 3) {
				if (Math.floor(Math.random() * 2) == 0) {
					selectedTileCol = 2;
				} else {
					selectedTileCol = 4;
				}
			} else if (blankTileCol == 4) {
				if (Math.floor(Math.random() * 2) == 0) {
					selectedTileCol = 3;
				} else {
					selectedTileCol = 4;
				}

			}
			selectedTileRow = blankTileRow;
		}
		if (!((blankTileRow == selectedTileRow) && (blankTileCol == selectedTileCol))) {
			let swap1 = "cell" + blankTileRow + blankTileCol;
			let swap2 = "cell" + selectedTileRow + selectedTileCol;
			swapTiles(swap1, swap2);
			blankTileRow = selectedTileRow;
			blankTileCol = selectedTileCol;
		}
	}
	startTimer();
	music = new sound('music.mp3');
	music.play();
	return;
}
function clickTile(row, column) {

	var cell = document.getElementById("cell" + row + column);
	var tile = cell.className;

	moves = document.getElementById("moves");

	if (tile != "blankSpace") {
		if (column < 4) {
			if (document.getElementById("cell" + row + (column + 1)).className == "blankSpace") {
				swapTiles("cell" + row + column, "cell" + row + (column + 1));
				increment_moves();
			}
		}
		if (column > 1) {
			if (document.getElementById("cell" + row + (column - 1)).className == "blankSpace") {
				swapTiles("cell" + row + column, "cell" + row + (column - 1));
				increment_moves();
			}
		}
		if (row > 1) {
			if (document.getElementById("cell" + (row - 1) + column).className == "blankSpace") {
				swapTiles("cell" + row + column, "cell" + (row - 1) + column);
				increment_moves();
			}
		}
		if (row < 4) {
			if (document.getElementById("cell" + (row + 1) + column).className == "blankSpace") {
				swapTiles("cell" + row + column, "cell" + (row + 1) + column);
				increment_moves();
			}
		}
	}

	if (checkIfWon()) {
		document.body.style.backgroundColor = "gold";
		if (currentTime < bestTime) {
			bestTime = currentTime;
		}

		if (current_moves < bestMove) {
			bestMove = current_moves;
		}
		alert("You won in " + current_moves + " moves and it took " + currentTime + " seconds.\n The best time is " + bestTime + " seconds and the least number of moves is " + bestMove);
	}
	return;
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function () {
		this.sound.play();
	}
}

function increment_moves() {

	if (moves) {
		current_moves++;
		moves.innerHTML = current_moves;
	}
}

function checkIfWon() {
	let tileCount = 1;
	for (let rowTest = 1; rowTest < 5; rowTest++) {
		for (let colTest = 1; colTest < 5; colTest++) {
			let cellTest = "cell" + rowTest + colTest;
			let tileTest = "tile" + tileCount;
			if (tileTest === "tile16") {
				//Puzzle is correct as all other tiles are in the right spot
				return true;
			}
			if (!(document.getElementById(cellTest).classList.contains(tileTest))) {
				return false;
			}
			tileCount++;
		}
	}
}
