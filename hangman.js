const hmSeq = require('./theHangMan.json');

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const word = "haaaaang-man";
let chances = 6;
let foundLtrs = [];
let wrg_found = [];
const letters = word.split("");
const wrd_lngth = word.replace(/[a-zA-Z]/g, "_");
let replacement = wrd_lngth.split("");
let tries = foundLtrs.length;
let key = 1;

const checkForNoChar = checkForNaC();

console.log(`The word is: ${wrd_lngth}`);

function StartTheGame() {
    
    if (foundLtrs.length !== checkForNoChar && chances > 0) {
        
        console.log(`\nIN IF STATEMENT: \nFound letter length: ${tries}\nLetters length: ${checkForNoChar}\nChances: ${chances}`)
        
        rl.question("Guess the letter..." , (answer) => {
            
            const ans = CorrectLetter(answer);
            
            if (ans) {
                
                const guessRight = LetterGuessedRight(answer);
                
                if (guessRight) {
                    
                    console.log(`You've guessed with this letter before, and it was correct, try again.`);
                    StartTheGame();
                    return;
                    
                } else {

                    simLtrs = findSimilarChars(answer);
                    foundLtrs.length = foundLtrs.length + simLtrs;
                    foundLtrs.push(answer);
                    console.log(`The answer was correct\nLetters found: ${foundLtrs}`);
                    replaceEmpty(answer);
                    console.log(`\n\nCurrent shape: ${replacement.join('')}`);
                }
                
            } else {

                wrg_found.push(answer)
                console.log(`Poor man: \n${manHang(key)}`);
                key++;
                chances -= 1;
                console.log(`You've answered wrong, ${chances} are left.\nWrong answers found: ${wrg_found}`);
                
            }
            
            StartTheGame();
            
        })
        
    } else {
        
        rl.close();
        
        if (foundLtrs.length === checkForNoChar) {
            
            console.log(`\nCongrats, you've won the game!`);
            
        }   

        console.log(`\nGG, you've got ${chances} chances.`);
    
    }
    
}


function CorrectLetter(letter) {

    return letters.some((ltr) => letter === ltr);

}

function LetterGuessedRight(guessed) {

    return foundLtrs.some((ltr) => guessed === ltr);

}

function findSimilarChars(gussed) {

    let simWrdsCnt = 0;

    let i;

    for (i = 0; i <= letters.length; i++) {

        ltr1 = letters[i];

        if (ltr1 === gussed) {

            simWrdsCnt++;

        }

    }

    return simWrdsCnt - 1;

}

function replaceEmpty(letter) {

    let i;

    for (i = 0; i < word.length; i++) {

        currentChar = word[i];

        if (currentChar === letter) {

            replacement[i] = currentChar;

        }

    }

    return replacement.join('').split('');

}

function checkForNaC() {

    const str = word;
    const exp = /[a-zA-Z]/g;

    const matches = str.match(exp);

    if (matches) {

        return matches.length;

    } else {

        return 0;

    }
}

function manHang(key) {

    let sequence = hmSeq[key].drawing;

    return sequence;

}

console.log(`\nDon't kill him: \n${manHang(0)}`);
StartTheGame();
