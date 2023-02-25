let squares = document.querySelectorAll('.square');
let answer = '';
const resetGame = (numOfSquares) => {
	// ! assigning random colors to all squares
	for (let ele of squares) {
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);
		ele.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	}

	// ! choosing one random square to be the answer
	answer = '';
	let rndIndex = Math.floor(Math.random() * numOfSquares); // 0-5 -> indices
	let candidateSquare = squares[rndIndex];
	answer = candidateSquare.style.backgroundColor;

	// ! change text in banner to be the answer
	let question = document.querySelector('.rgb-question');
	question.innerText = answer.toUpperCase();

	// ! while resetting the game, change background color of banner to original color
	let mainBanner = document.querySelector('main');
	mainBanner.style.backgroundColor = 'steelblue';
	mainBanner.style.color = 'white';
};

resetGame(6);

// ! logic for checking if the chosen option is correct or not
// 1. listen for click event on every square
// 2. check if background color of that square is my answer or not
// 3. if not, make the square invisible
// 4. else, make all squares visible and change background color to answer
// 5. change color of banner also

for (let square of squares) {
	square.addEventListener('click', () => {
		if (square.style.backgroundColor === answer) {
			// ! make all squares visible and change their background color
			for (let sq of squares) {
				sq.style.backgroundColor = answer;
			}
			// ! change background color of banner
			let mainBanner = document.querySelector('main');
			mainBanner.style.backgroundColor = answer;

			//* if answer color is too bright, then change text color of main to black
			// "rgb(14, 45, 123)" substr
			// "14, 45, 123" -> ['14', '45', '123]
			let temp = answer.slice(4, answer.length - 1);
			let arr = temp.split(',');
			let r = parseInt(arr[0].trim()),
				g = parseInt(arr[1].trim()),
				b = parseInt(arr[2].trim());
			if (r >= 150 || g >= 150 || b >= 150) {
				mainBanner.style.color = 'black';
			} else {
				mainBanner.style.color = 'white';
			}
		} else {
			// ! invisible
			square.style.backgroundColor = 'black';
		}
	});
}

//! difficulty switching
let easyBtn = document.querySelector('.easy-btn');
let hardBtn = document.querySelector('.hard-btn');
let row2 = document.querySelector('.row2');
// ! if easy is triggered, remove row2
easyBtn.addEventListener('click', () => {
	resetGame(3);
	row2.style.display = 'none';
	// button selected effect
	easyBtn.classList.add('selected');
	hardBtn.classList.remove('selected');
});
// ! if hard is triggered, add row2
hardBtn.addEventListener('click', () => {
	resetGame(6);
	row2.style.display = 'flex';
	// button selected effect
	easyBtn.classList.remove('selected');
	hardBtn.classList.add('selected');
});

// ! reset the game
let resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', () => {
	if (easyBtn.classList.contains('selected')) {
		resetGame(3);
	} else {
		resetGame(6);
	}
});
