<script>
    import {
        sentence,
        currentResponse
    } from '../stores/quiz-store.js';

    // utility functions for working with text/words
    import {
        sentenceWords,
        isPlainWord,
        blankPretext,
        blankPosttext,
        blankText,
        blankTextLength
    } from '../utils/word-work.js';

    const EMPTY_LENGTH = 4; // length of empty text inputs
    let theWords = sentenceWords($sentence); // 

    let answerKey = [];
    let answerKeyCounter = 1;

    function currentSentence() {
        console.log("currSent");
    }

    function resizeInput(event) {
        event.target.classList.remove("correctResponse");
        event.target.classList.remove("incorrectResponse");
        event.target.classList.remove("noResponse");
        let newLength = event.target.value.length;
        if(newLength > 1) {
            event.target.size = newLength - 1;
        } else if (!newLength) {
            event.target.classList.add("noResponse");
            event.target.size = EMPTY_LENGTH;
        } else {
            event.target.size = 1;
        }
        // console.table(event.target.value.length);
    }

    function buildWordArray(index, answerText) {
        // Is this too much of a hack? This func returns a counter within the HTML, _but_ the array of answers gets built along with the text input UI elements.
        answerKey[index] = blankText(answerText);

        return answerKeyCounter++;
    }

    function checkAnswers(event) {
        // get NodeList of current state of all of the text input elements
        let theBlanks = document.getElementsByClassName('inputElement');

        for (let item of theBlanks) {
            // if current answer key is a multi-element array (more than one correct answer), attempt to match value of current text input value against a String built by joining the answer key array with a pipe character
            let isMatched = answerKey[item.id].join("|").indexOf(item.value);
            if(item.value && (isMatched > -1)) {
                item.classList.remove("incorrectResponse")
                item.classList.add("correctResponse")
            } else {
                item.classList.remove("correctResponse")
                item.classList.add("incorrectResponse")
            }
        }
    }
</script>

<!-- <p>{$sentence}</p> -->
<form>
    <div id="wordContainer">
        {#each theWords as aWord, i}
            {#if isPlainWord(aWord) }
                <div class="textElement" id="{i}">{aWord}</div>
            {:else}
                <!-- call to buildWordArray(i, aWord) always returns empty String -->
                <!-- adds answer text to local array for comparison against user responses -->
                <div class="textElement">
                    {blankPretext(aWord)}<input type="text" class="inputElement noResponse" id="{i}" size={EMPTY_LENGTH} placeholder="({buildWordArray(i, aWord)})" on:input={resizeInput}>{blankPosttext(aWord)}
                </div>
            {/if}
        {/each}
    </div>

    <button class="checkButton"
        type="button"
        on:click="{checkAnswers}">
        Check
    </button>
</form>

<style>
	#wordContainer {
		min-width: 100px;
		max-width: 1200px;
        user-select: none;
        /* padding: 1em 1em 1em 1em; */
	}

	.textElement {
		display: inline-block;
		margin: .2em .2em;
		padding: 0em 0em .4em 0em;
		color: #040404;
		font-size: 1em;
        text-align: left;
	}

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: red;
        opacity: .4; /* Firefox */
        text-align: center;
    }

    .inputElement {
		display: inline-block;
		margin: 0px 0px;
		padding: 0px 0px 0px 0px;
		color: #1010CC;
		font-size: 1em;
        font: "Times New Roman", Times, serif;
        font-weight: bolder;
        text-align: left;
	}

    .inputElement:focus {
        background-color: #fff;
    }

    :global(.noResponse) {
        background-color: #eee;
    }
    :global(.correctResponse) {
        /* border: 4px solid green; */
        background-color: #44FF44;
        color: white;
    }

    :global(.incorrectResponse) {
        /* border: 4px solid red; */
        background-color: #FF4444;
        color: white;
    }

</style>
