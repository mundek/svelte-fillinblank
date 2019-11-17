export function sentenceWords(aSentence) {
    // first regex from https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
    // let onlyLetters = aSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").split(" ");

    // let punctuatedWords = aSentence.match(/\S+/g);
    let punctuatedWords = aSentence.match(/\S+/g);
    console.log(punctuatedWords);
    return punctuatedWords;
}

export function isPlainWord(someWord) {
    if (someWord.match(/\**\*/g)) {
        console.log(someWord);
        return false;
    } else {
        return true;
    }
}

export function blankPretext(someWord) {
    let a = someWord.match(/^[^\*]*/);
    console.log(a);
    return a;
}

export function blankPosttext(someWord) {
    let a = someWord.match(/[^\*]*$/);
    console.log(a);
    return a;
}

export function blankText(someWord) {
    let a = someWord.match(/\*(.*)\*/);
    console.log(a);
    return a[1];
}

export function blankTextLength(someWord) {
    let a = someWord.match(/\*(.*)\*/);
    console.log(a);
    return a[1].length;
}