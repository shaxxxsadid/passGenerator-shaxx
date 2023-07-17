const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generate = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

clipboard.addEventListener('click', () => {
	if (!resultEl.innerText) { return; }

	navigator.clipboard
		.writeText(resultEl.innerText)
		.then(() => {
			alert('Password copied to clipboard');
		})
		.catch(() => {
			alert('Неудача :(');
		});
});

generate.addEventListener('click', () => {
	const length = + lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

});
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
	for (let i = 0; i < length; i += 1) {
		var rand = Math.floor(Math.random() * typesArr.length);
		var randomValue = typesArr[rand];
		const funcName = Object.keys(randomValue)[0];
		generatedPassword += randomFunc[funcName]();

	}

	const finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
}


function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

