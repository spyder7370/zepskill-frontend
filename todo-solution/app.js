let submitBtn = document.querySelector('.submitBtn');
let input = document.querySelector('input');
let list = document.querySelector('ul');

submitBtn.addEventListener('click', () => {
	let formValue = input.value;
	if (formValue.length > 0) {
		/* *
            1. make a new LI
            2. put the value of LI the same as input value
            3. add that newly made LI into your list
        */
		let newLi = document.createElement('li');
		newLi.textContent = formValue + ' ';
		let newSpan = document.createElement('span');
		newSpan.textContent = 'X';
		newLi.appendChild(newSpan);
		list.appendChild(newLi);
		// * form reset
		input.value = '';
	} else {
		input.classList.toggle('invisible');
	}
});

document.addEventListener('click', (event) => {
	// 1. if what I clicked is a LI, then gray that item
	// * event.target -> element that is clicked
	if (event.target.tagName === 'LI') {
		let clickedLi = event.target;
		clickedLi.classList.toggle('crossed');
	} else if (event.target.tagName === 'SPAN') {
		let clickedSpan = event.target;
		clickedSpan.parentNode.classList.add('invisible');
	}
});

/*
    1. select search input
    2. select all available LIs
    3. try to match the search value with the lis innert text
    4. if a match is found then only display that li and make everyone else invisible
*/
