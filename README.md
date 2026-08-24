# Zyfr@ Encrypter-Decrypter

## Table of Contents:

- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [How It Works](#how-it-works)
- [Technologies](#technologies)
- [Setup](#setup)

## About The App
## 🚀 Features
- **Multiple Algorithms.**
- **Real-time Processing:** Encryption and decryption happen instantly.
- **Copy to Clipboard:** One-click copying for easy sharing.
- **Privacy Mode:** Toggle visibility of the encryption method to keep onlookers guessing.
- **Timestamping:** Every message includes a "Created at" metadata footer.

Encryption is the process that converts the original representation of the information, known as **plaintext**, into an alternative form known as **ciphertext**.

Decryption is the reverse process.

This app uses multiple encryption methods to secure your text. The date and time of creation are automatically appended to the bottom of the message.


## Screenshots
<img alt="Screenshot1" src="https://github.com/user-attachments/assets/5034ffe2-1b62-4671-adad-4a22d08f660c" />


<img alt="Screenshot2" src="https://github.com/user-attachments/assets/867f9826-db5a-4297-a892-3588f9aae746" />


<img width="400" alt="Screenshot Mob" src="https://github.com/user-attachments/assets/52137e01-1be7-4e21-a076-20b4bcab1ce7" />
 
## How It Works

### How to Use This App:
1. **Input Text:** Type or paste your message into the text area.
2. **Select Method:** Choose your desired algorithm from the 'Method options' dropdown.
3. **Privacy Toggle:** Use the slider to show or hide the selected method for extra security.
4. **Process:** Click **ENCRYPT** to secure your text.
5. **Copy & Save:** Use the **Copy** button to save to your clipboard.
6. **Decrypt:** Paste the ciphertext, select the matching method, and click **DECRYPT**.

### Live Demo: [Zyfr@](https://zifr.netlify.app/)
---

### 🧠 Logic Behind the Algorithms

#### Custom Methods
RAV Series (Custom Ciphers): I designed custom encoding algorithms (RAV-ESO, RAV-N, RAV-S) that convert text characters into Unicode/Roman numeral mappings, reverse the string, and inject custom symbols to obscure the payload.

#### The Vigenère Implementation
This method uses a keyword to shift letters. My implementation ensures:
- **Case preservation:** Uppercase letters stay uppercase.
- **Symbol skipping:** Spaces and punctuation are not encrypted, keeping the message structure intact.

   Some enryption methods require a key for encoding and the same key for decoding text. 
   For example the Vigenère cipher is a method of encrypting alphabetic text where each letter of the plaintext is encoded with a different Caesar cipher, 
   whose increment is determined by the corresponding letter of another text, the key. Below is the JavaScript implementation of Vigenere cypher encryption:
   
```
//HELPER FUNCTIONS 

const isUpperCase = (l) => /[A-Z]/.test(l);
const isLowerCase = (l) => /[a-z]/.test(l);

function isLetter(letter) {
    if (isLowerCase(letter) || isUpperCase(letter)) {
        return true;
    } else {
        return false;
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

//*VIGENERE ENCRYPTION FUNCTION

   function encryptVigenere(text, key) {

    if (!key || !key.match(/[a-zA-Z]/g)) return;
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
}
```
Caesar cypher is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions along the alphabet (ROT13 uses a shift of 13.).
Caesar cypher (Rot 13) JavaScript implementation:


```
// ROT 13 encryption handler
function rot13encrypter(str) {
    const rot = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM0123456789';
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const handleEncryption = (x) => rot[alpha.indexOf(x)];
    return str.replace(/[a-zA-Z0-9]/g, handleEncryption);
};
```


## Technologies
   - `HTML5`
   - `CSS3`
   - `JavaScript`
   - `Animate.css`

## 🔮 Future Improvements

I am currently working on expanding the app's capabilities. The following features are planned for version 2.0:

- [ ] **File Upload Support:** Enable users to drag and drop `.txt` or `.md` files for instant encryption.
- [ ] **Additional Algorithms**
- [ ] **QR Code Integration:** Generate a shareable QR code of the ciphertext that can be scanned and decrypted on the fly.

  
## Setup
  - open live demo app on the link above
  - OR Clone the repository
  - open `index.html` with Live Server
