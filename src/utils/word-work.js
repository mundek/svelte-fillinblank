// Functions returning non-Boolean values will return -1 when they fail for any reason

export function textWords(aSentence) {
    // first regex from https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
    // let onlyLetters = aSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").split(" ");

    // let punctuatedWords = aSentence.match(/\S+/g);
    let punctuatedWords = aSentence.match(/\S+/g);

    return punctuatedWords;
}

export function isPlainWord(someWord) {
    if (someWord.match(/\**\*/g)) {
        return false;
    } else if (someWord) {
        return true;
    } else {
        // there's a problem ...
        return -1;
    }
}

export function blankPretext(someWord) {
    let a = someWord.match(/^[^\*]*/);
    if (a) {
        return a;
    } else {
        // there's a problem ...
        return -1;
    }
}

export function blankPosttext(someWord) {
    let a = someWord.match(/[^\*]*$/);
    if (a) {
        return a;
    } else {
        // there's a problem ...
        return -1;
    }
}

export function blankText(someWord) {
    let a = someWord.match(/\*(.*)\*/);

    // NOTE: a[0] is the matched string, including the enclosing '*' characters, while a[1] is only the portion in the captured bit in the middle
    if (a[1]) {
        // split text on 'pipe' character, if any
        return a[1].split("|");
    } else {
        // there's a problem ...
        return -1;
    }
}

export function blankTextLength(someWord) {
    let a = someWord.match(/\*(.*)\*/);
    // return length of a[1] because a[0] is the full match, including the enclosing asterisks (*TEXT*)
    if (a[1]) {
        return a[1].length;
    } else {
        // there's a problem ...
        return -1;
    }
}