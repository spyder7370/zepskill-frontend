let finalScore = 3;
let p1Score = 0;
let p1Btn = document.querySelector('.p1-btn');
let p1Text = document.querySelector('.p1-text');
let p2Score = 0;
let p2Btn = document.querySelector('.p2-btn');
let p2Text = document.querySelector('.p2-text');
let resetBtn = document.querySelector('.reset-btn');
let select = document.querySelector('#round-select');

const resetGame = () => {
	p1Score = 0;
	p2Score = 0;
	p1Text.style.color = 'black';
	p2Text.style.color = 'black';
	p1Btn.disabled = false;
	p2Btn.disabled = false;
	p1Text.innerText = `${p1Score}`;
	p2Text.innerText = `${p2Score}`;
};

select.addEventListener('change', () => {
	finalScore = parseInt(select.value);
	resetGame();
});

//! player 1
// 1. select player 1 button
// 2. select player 1 text
// 3. event listener on button
// 4. when click is fired, change the text
p1Btn.addEventListener('click', () => {
	if (p1Score !== finalScore) {
		p1Score += 1;
		p1Text.innerText = `${p1Score}`;
	}
	if (p1Score === finalScore) {
		p1Text.style.color = 'green';
		p2Text.style.color = 'red';
		p1Btn.disabled = true;
		p2Btn.disabled = true;
	}
});

//! player 2
// 1. select player 2 button
// 2. select player 2 text
// 3. event listener on button
// 4. when click is fired, change the text

p2Btn.addEventListener('click', () => {
	if (p2Score !== finalScore) {
		p2Score += 1;
		p2Text.innerText = `${p2Score}`;
	}
	if (p2Score === finalScore) {
		p1Text.style.color = 'red';
		p2Text.style.color = 'green';
		p1Btn.disabled = true;
		p2Btn.disabled = true;
	}
});

resetBtn.addEventListener('click', resetGame);
