//Variables
const descriptionButton = document.getElementById('descBtn');
const description = document.getElementById("description");
const encryptTextBox = document.getElementById('textEnc')
const encryptOut = document.getElementById('textEncOut');
const decryptTextBox = document.getElementById('text-for-decryption');
const decryptOut = document.getElementById('textDecOut');
const encryptButton = document.getElementById('encBtn');
const decryptButton = document.getElementById('decBtn');
const encryptSelect = document.getElementById('encrypter-select');
const decryptSelect = document.getElementById('decrypter-select');
const inputOne = document.getElementById('number1');
const inputTwo = document.getElementById('number2');
const showEncrypt = document.getElementById('descBtnMob1');
const showDecrypt = document.getElementById('descBtnMob2');
const encryptSection = document.getElementById('encryptSection');
const decryptSection = document.getElementById('decryptSection');
const form = document.getElementById('form');
const copyEncrypted = document.getElementById('copy_encrypted_txt');
const pasteInEncryptionTxtBox = document.getElementById('paste-encryption');
const deleteEncryptionInputText = document.getElementById('delete-encryption-input');
const copyFromEncryptedTextBox = document.getElementById('copy-from-encrypted');
const deleteEncryptedText = document.getElementById('delete-encryped-text');
const pasteInBoxForDecryption = document.getElementById('paste_text_in_encryption_box');
const deleteTextFromBoxForDecryption = document.getElementById('delete_from_area_for_decryption');
const copyFromAreaForDecryption = document.getElementById('copy_text_from_area_for_decryption');
const deleteTextFromDecrypted = document.getElementById('delete_text_from_decrypted');
const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const eso = '()[]+!';
const katakana = 'アァカサタナハマラワガ'
// const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const str = '#$%&?@';

const alphabet = nums + latin + eso + str + katakana;
const rainDrops = [];
const fontSize = 16
const columns = canvas.width/fontSize

for( let x = 0; x < columns; x++ ) {
    rainDrops[x] = 1;
}
const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
};
setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
//**ENCRYPTION TEXTAREA TEXT HANDLERS

//Paste text in encryption text box handler
const pasteEncryptionText = async () => {
    navigator.clipboard.readText()
        .then((clipText) => (encryptTextBox.value = clipText))
        .catch(err => console.error(err))
}
//Paste text in textarea for encryption 
pasteInEncryptionTxtBox.onclick = pasteEncryptionText;

//Deletes text from textarea for encryption
deleteEncryptionInputText.addEventListener('click', async () => {
    encryptTextBox.value = ''
})

//**ENCRYPTED TEXTAREA HANDLERS

//Encrypted textarea copy handler
const copyEncryptedText = async () => {
    const text = encryptOut.value;
    navigator.clipboard.writeText(text.slice(0, text.indexOf('Created')))
        .then(() => alert('Copied!'))
        .catch(err => console.error(err))
}
// Copy text from encrypted text box
copyFromEncryptedTextBox.onclick = copyEncryptedText;

//Deletes text from encrypted text textarea
deleteEncryptedText.addEventListener('click', async () => {
    encryptOut.innerHTML = ''
})

//**TEXTAREA FOR DECRYPTION HANDLERS

//Paste text in textarea for decryption
const pasteTextInBoxForDecryption = async () => {
    navigator.clipboard.readText()
        .then((clipText) => (decryptTextBox.value = clipText))
        .catch(err => console.error(err))
}
pasteInBoxForDecryption.onclick = pasteTextInBoxForDecryption;

//Deletes text from textarea for decryption
deleteTextFromBoxForDecryption.addEventListener('click', () => {
    decryptTextBox.value = ''

});

//Copy text from textarea for decryption
const copyAreaForDecryption = async () => {
    const text = decryptTextBox.value;
    navigator.clipboard.writeText(text)
        .then(() => alert('Copied!'))
        .catch(err => console.error(err))
}

copyFromAreaForDecryption.onclick = copyAreaForDecryption;


//DECRYPTED TEXTAREA HANDLER
deleteTextFromDecrypted.addEventListener('click', () => {
    decryptOut.innerHTML = ''
});


//Prevents drag and dropp block
encryptTextBox.addEventListener("dragover", (event) => {
    event.dataTransfer.dropEffect = "move";
});

decryptTextBox.addEventListener("dragover", (event) => {
    event.dataTransfer.dropEffect = "move";
});

//**DATE

//Date object and instances required to create correct time format
const time = new Date();
const year = time.getFullYear();
const month = time.getMonth() + 1;
const day = time.getDay();
const date = time.getDate();
const hours = time.getHours();
const minutes = time.getMinutes();
const secs = time.getSeconds();

const dayNames = ["Sunday", "Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dateMonthYear = [date, month, year].map(x => x < 9 ? '0' + x : x).join('.');
const hoursMinutesSeconds = [hours, minutes, secs].map(x => x < 9 ? '0' + x : x).join(':');

//Time format 
const timeFormat = `${dayNames[day]}, ${dateMonthYear}, ${hoursMinutesSeconds}`;


//Shows inputOne if Vigenere cipher or `something else([*for possible updates])` is selected 
document.body.addEventListener('mousemove', () => {
    encryptSelect.value === 'Vigenere' || encryptSelect.value === '*' ? inputOne.style.display = 'block' : inputOne.style.display = 'none';
});

//Shows inputTwo if Vigenere cipher or `something else([*for possible updates])` is selected 
document.body.addEventListener('mousemove', () => {
    decryptSelect.value === 'Vigenere' || decryptSelect.value === '*' ? inputTwo.style.display = 'block' : inputTwo.style.display = 'none';
})


// Shows/hides description
const showHideTextBox = () => {
    description.style.display === "none" ? description.style.display = "block" : description.style.display = "none";
}

//Shows only encrypt section on small screens
const showEncryptFunction = () => {
    encryptSection.style.display = 'block';
    decryptSection.style.display = 'none';
    showEncrypt.style.background = 'red';
    showDecrypt.style.background = 'linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b)'
}

//Shows only decrypt section on small screens
const showDecryptFunction = () => {
    decryptSection.style.display = 'block';
    encryptSection.style.display = 'none';
    showDecrypt.style.background = 'red';
    showEncrypt.style.background = 'linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b)'
}

showEncrypt.onclick = showEncryptFunction;
showDecrypt.onclick = showDecryptFunction;

//Shows description 
descriptionButton.onclick = showHideTextBox;

const hideTextBox = () => {
    description.style.display = "none";
};

form.onclick = hideTextBox;

// Hides description text box on page load
window.onload = () => {
    description.style.display = "none";
}

// Shows/hides encryption method depending on switcher position
const showHideMethodEnc = () => {
    const slider = document.getElementById('switch');
    return slider.checked === true ? `Method: ${encryptSelect.value} ${inputOne.value}` : `Method hidden.`;
}


//**ENCRYPTION HANDLER**
const handleEncryption = () => {
    if (encryptTextBox.value === '') alert('Nothing to encrypt, enter text in encryption text box.')
    if (encryptSelect.value === 'option') alert('Please select encryption method!')
    if (encryptSelect.value === 'RAV-ESO') encryptOut.innerHTML = `${ravEso(encryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (encryptSelect.value === 'RAV-N') encryptOut.innerHTML = `${rav_n(encryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (encryptSelect.value === 'RAV-S') encryptOut.innerHTML = `${rav_s(encryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (encryptSelect.value === 'Substitution') encryptOut.innerHTML = `${encryptSubstitution(encryptTextBox.value)}\n\n[Created: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (encryptSelect.value === 'Multi six') encryptOut.innerHTML = `${encodeMultSix(encryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (encryptSelect.value === 'Vigenere') encryptOut.innerHTML = `${encryptVigenere(encryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (encryptSelect.value === 'ROT 13') encryptOut.innerHTML = `${rot13encrypter(encryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
}
encryptButton.onclick = handleEncryption;

//Changes input one and/or input two value to string if Vigenere cipher is selected because some ciphers works only with numbers as a key
// and Vigenere cipher works only with strings as keys
const changeInputValue = () => {
    if (encryptSelect.value === 'Vigenere') {
        inputOne.setAttribute('type', 'text');
    } else {
        inputOne.setAttribute('type', 'number');
    }
    if (decryptSelect.value === 'Vigenere') {
        inputTwo.setAttribute('type', 'text');
    } else {
        inputTwo.setAttribute('type', 'number');
    }
};

encryptSelect.onclick = changeInputValue;




// **DECRYPTION HANDLER**
const handleDecryption = () => {
    if (decryptTextBox.value === '') alert('Nothing to decrypt, enter text in decryption text box.')
    if (decryptSelect.value === 'option') alert('Please select decryption method!');
    if (decryptSelect.value === 'RAV-ESO') decryptOut.innerHTML = `${ravEsoDec(decryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (decryptSelect.value === 'RAV-N') decryptOut.innerHTML = `${ravDec_n(decryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (decryptSelect.value === 'RAV-S') decryptOut.innerHTML = `${rav_sDec(decryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (decryptSelect.value === 'Substitution') decryptOut.innerHTML = `${decryptSubstitution(decryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (decryptSelect.value === 'Multi six') decryptOut.innerHTML = `${decodeMultSix(decryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (decryptSelect.value === 'Vigenere') decryptOut.innerHTML = `${decryptVigenere(decryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
    else if (decryptSelect.value === 'ROT 13') decryptOut.innerHTML = `${rot13decrypter(decryptTextBox.value)}\n\nCreated: ${timeFormat}, ${showHideMethodEnc()}`;
}
decryptButton.onclick = handleDecryption;

decryptSelect.onclick = changeInputValue;

// Function to toggle input visibility based on select value
const updateInputVisibility = () => {
    if (encryptSelect.value === 'Vigenere' || encryptSelect.value === '*') {
        inputOne.style.display = 'block';
    } else {
        inputOne.style.display = 'none';
    }

    if (decryptSelect.value === 'Vigenere' || decryptSelect.value === '*') {
        inputTwo.style.display = 'block';
    } else {
        inputTwo.style.display = 'none';
    }
};

// Run once on load to set correct initial state
updateInputVisibility();

// Listen for actual changes on the dropdowns instead of mousemove
encryptSelect.addEventListener('change', updateInputVisibility);
decryptSelect.addEventListener('change', updateInputVisibility);


// ==================
// ----**CIPHERS**---
// ==================

// ROT 13 encryption handler
function rot13encrypter(str) {
    const rot = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM0123456789';
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const handleEncryption = (x) => rot[alpha.indexOf(x)];
    return str.replace(/[a-zA-Z0-9]/g, handleEncryption);
};

//ROT 13 decryption handler
function rot13decrypter(str) {
    const rot = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM0123456789';
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const handleDecryption = (x) => alpha[rot.indexOf(x)];
    return str.replace(/[a-zA-Z0-9]/g, handleDecryption);
};


//Substitution encryption handler
function encryptSubstitution(str) {
    return str.replace(/./g, x => x.charCodeAt(0) + 58);
}

//Substitution decryption handler
function decryptSubstitution(str) {
    return str.replace(/1?\d{2}/g, i => String.fromCharCode(+i - 58));
}

//Multi six encryption handler
function encodeMultSix(str) {
    return str.split('').map(x => x.charCodeAt(str) * 6).map(x => String.fromCharCode(x)).join('');
}

//Multi six decryption handler
function decodeMultSix(str) {
    return str.replace(/[\\#,$~%.'":*?<>\d\w]/gi, '').split('').map(x => x.charCodeAt(str) / 6).map(x => String.fromCharCode(x)).join('');
}


//*HELPER FUNCTIONS FOR VIGENERE

//Checks if letter is uppercase 
const isUpperCase = (l) => /[A-Z]/.test(l);

//Checks if letter is lowercase
const isLowerCase = (l) => /[a-z]/.test(l);

//Checks if input value is letter
function isLetter(letter) {
    if (isLowerCase(letter) || isUpperCase(letter)) {
        return true;
    } else {
        return false;
    }
}

//Modulo
function mod(n, m) {
    return ((n % m) + m) % m;
}


//Vigenere cipher encryption handler
function encryptVigenere(text, key) {
    key = inputOne.value.split('').filter(x => x.match(/[a-z]/gi)).join('');

    if (!key.match(/[a-zA-Z]/g)) alert('The key must be a word or letter containing only alphabetic characters.');
    let cypher = "";
    for (let i = 0, j = 0; i < text.length; i++) {
        let currentLetter = text[i];

        if (isUpperCase(currentLetter)) {
            const upperLetter = ((currentLetter.charCodeAt() - 65) + (key[j % key.length].toUpperCase().charCodeAt() - 65)) % 26;
            cypher += String.fromCharCode(upperLetter + 65);
            j++;
        } else if (isLowerCase(currentLetter)) {
            const lowerLetter = ((currentLetter.charCodeAt() - 97) + (key[j % key.length].toLowerCase().charCodeAt() - 97)) % 26;
            cypher += String.fromCharCode(lowerLetter + 97);
            j++;
        } else {
            cypher += currentLetter;
        }
    }
    return cypher;
};

//Vigenere cipher decryption handler
function decryptVigenere(enc, key) {

    key = inputTwo.value.split('').filter(x => x.match(/[a-z]/gi)).join('').replace(/\s+/g, '');

    if (!key.match(/[a-zA-Z]/g)) alert('The key must be a word or letter containing only alphabetic characters.');

    let decrypted = "";
    let j = 0;

    for (let i = 0; i < enc.length; i++) {
        let currentLetter = enc[i];
        const A = 65;
        const a = 97;

        if (isUpperCase(currentLetter)) {
            let Ci = (currentLetter.charCodeAt(0) - A);
            let Ki = (key[j % key.length].toUpperCase()).charCodeAt() - A;
            let upperLetter = mod(Ci - Ki, 26);

            decrypted += String.fromCharCode(upperLetter + A);

            j++;
        } else if (isLowerCase(currentLetter)) {
            let Ci = (currentLetter.charCodeAt(0) - a);
            let Ki = (key[j % key.length].toLowerCase()).charCodeAt() - a;
            let lowerLetter = mod(Ci - Ki, 26);

            decrypted += String.fromCharCode(lowerLetter + a);

            j++;
        } else {
            decrypted += currentLetter;
        }
    }
    return decrypted;
}

//*HELPER FUNCTIONS FOR RAV*

//Numbers to roman numerals handler
const toRomeHandler = (integer) => {
    let output = '';
    do {
        if (integer >= 1000) {
            output += 'M';
            integer -= 1000;
        } else if (integer >= 900 && integer <= 999) {
            output += 'CM';
            integer -= 900;
        } else if (integer >= 500 && integer <= 899) {
            output += 'D';
            integer -= 500;
        } else if (integer >= 400 && integer <= 499) {
            output += 'CD';
            integer -= 400;
        } else if (integer >= 100 && integer <= 399) {
            output += 'C';
            integer -= 100;
        } else if (integer >= 90 && integer <= 99) {
            output += 'XC';
            integer -= 90;
        } else if (integer >= 50 && integer <= 89) {
            output += 'L';
            integer -= 50;
        } else if (integer >= 40 && integer <= 49) {
            output += 'XL';
            integer -= 40;
        } else if (integer >= 10 && integer <= 39) {
            output += 'X';
            integer -= 10;
        } else if (integer > 8 && integer < 10) {
            output += 'IX';
            integer -= 9;
        } else if (integer >= 5 && integer <= 8) {
            output += 'V';
            integer -= 5;
        } else if (integer > 3 && integer < 5) {
            output += 'IV';
            integer -= 4;
        } else if (integer <= 3 && integer > 0) {
            output += 'I';
            integer -= 1;
        } else {
            output += 'Invalid input!';
        }
    } while (integer > 0);
    return output.toLowerCase();
};

//Roman numerals to numbers handler
const fromRomeHandler = (romanNum) => {
    const map = {
        I: 1,
        IV: 4,
        V: 5,
        IX: 9,
        X: 10,
        XL: 40,
        L: 50,
        XC: 90,
        C: 100,
        CD: 400,
        D: 500,
        CM: 900,
        M: 1000
    };

    return romanNum.match(/CM|CD|XC|XL|IX|IV|\w/g).reduce((acc, el) => acc + map[el], 0);
};

//RAV-ESO encryption handler
function ravEso(str) {
    const alpha = 'ivxlcdm';
    const repl = '][}+)(&';
    const replacer = (x) => repl[alpha.indexOf(x)];
    return str.split('')
        .map(x => x.charCodeAt())
        .map(x => toRomeHandler(x))
        .reverse()
        .join('!')
        .replace(/[ivxlcdm]/g, replacer)
};

//RAV-ESO decryption handler
function ravEsoDec(str) {
    str = str.replace(/[\\#,$~%.'":*?<>\d\w]/gi, '') //cleans the input string
    const repl = 'ivxlcdm';
    const alpha = '][}+)(&';
    const replacer = (x) => repl[alpha.indexOf(x)];
    return str
        .replace(/[\]\[\}\+\(\)\&}]/g, replacer).toUpperCase()
        .split('!')
        .reverse()
        .map(x => fromRomeHandler(x))
        .map(x => String.fromCharCode(x))
        .join('')
};


//RAV-N encryption handler
function rav_n(str) {
    const alpha = 'ivxlcdm';
    const repl = '1234567';
    const replacer = (x) => repl[alpha.indexOf(x)];
    return str.split('')
        .map(x => x.charCodeAt())
        .map(x => toRomeHandler(x))
        .reverse()
        .join('8')
        .replace(/[ivxlcdm]/g, replacer)
};

//RAV-N decryption handler
function ravDec_n(str) {
    const repl = 'ivxlcdm';
    const alpha = '1234567';
    const replacer = (x) => repl[alpha.indexOf(x)];
    return str
        .replace(/[1-7]/g, replacer).toUpperCase()
        .split('8')
        .reverse()
        .map(x => fromRomeHandler(x))
        .map(x => String.fromCharCode(x))
        .join('')
};

//RAV-S encryption handler
function rav_s(str) {
    const alpha = 'ivxlcdm';
    const repl = '!#$%&?@';
    const replacer = (x) => repl[alpha.indexOf(x)];
    return str.split('')
        .map(x => x.charCodeAt())
        .map(x => toRomeHandler(x))
        .reverse()
        .join('+')
        .replace(/[ivxlcdm]/g, replacer)
};

//RAV-S decryption handler
function rav_sDec(str) {
    const repl = 'ivxlcdm';
    const alpha = '!#$%&?@';
    const replacer = (x) => repl[alpha.indexOf(x)];
    return str
        .replace(/[\x!\x#\x$\x%\x&\x?\x@]/g, replacer)
        .toUpperCase()
        .split('+')
        .reverse()
        .map(x => fromRomeHandler(x))
        .map(x => String.fromCharCode(x))
        .join('')
};
