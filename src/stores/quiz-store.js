import { writable } from 'svelte/store';

export let sentence = writable(`TEXT *IS* NOT SET`);
export let answerKey = writable([]);
// start at 1 for human-readable indices in each of the text inputs' placeholders
export let answerKeyCounter = writable(1);

export function setQuizText(aText) {
    if(aText) {
        sentence.set(aText);
    } else {
        sentence.set(`TEXT *IS* NOT SET`);
    }
    answerKey.set([]);
    answerKeyCounter.set(1);
}