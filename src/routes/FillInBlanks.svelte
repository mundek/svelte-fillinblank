<script>
    // import relevant state values and function, setQuizText(), from svelte store
    import {
        sentence,
        answerKey,
        answerKeyCounter,
        setQuizText
    } from '../stores/quiz-store.js';

    // utility functions for working with text/words
    import {
        textWords,
        isPlainWord,
        blankPretext,
        blankPosttext,
        blankText
    } from '../utils/word-work.js';

    // set currentText for devo purposes; eventually, currentText will be set from an array of texts in quiz-store.js, allowing for multi-item quizzing
    let currentText = `Costa Rica, oficialmente República de Costa Rica, es *una* nación soberana, organizada como *una* república presidencialista unitaria compuesta por 7 provincias. Ubicada en América Central, posee *un* territorio con *un* área total de 51 100 km². Limita con Nicaragua a*l* norte, *el* mar Caribe a*l* este, Panamá a*l* sureste y *el|un* océano Pacífico a*l* oeste. En cuanto a *los* bordes marítimos, colinda con Panamá, Nicaragua, Colombia y Ecuador. Cuenta con 5 057 000  habitantes según su última proyección demográfica. Su capital, centro político y económico es San José, y su idioma oficial es *el* español.`;
    setQuizText(currentText);

    const LOCK_CORRECT = true; // if true, only incorrect answers may be changed after checkAnswers() has been called
    const EMPTY_LENGTH = 4; // length of empty text inputs
    let theWords = textWords($sentence); // parse text into words

    function resizeInput(event) {
        // clear text input classes
        event.target.classList.remove("correctResponse");
        event.target.classList.remove("incorrectResponse");
        event.target.classList.remove("noResponse");

        // store length of text input
        let newLength = event.target.value.length;

        // ensure proper sizing, depending on current length (avoid setting size=0); if blank, show placeholder text and set size to EMPTY_LENGTH constant
        if(newLength > 1) {
            event.target.size = newLength - 1;
        } else if (!newLength) {
            event.target.classList.add("noResponse");
            event.target.size = EMPTY_LENGTH;
        } else {
            event.target.size = 1;
        }
    }

    function buildWordArray(index, answerText) {
        // Is this too much of a hack? This func returns a counter for use within the HTML, _but_ the array of answers gets built along with the text input UI elements. The return value is used by the svelte {#each} loop in the HTML to give a consecutive count to each text input's placeholder value

        // $answerKey (from quiz-store.js) is an array of arrays (often single-item, but allowing for multiple correct answers); array is built through repeated calls to buildWordArray(Number:index, Array:answerText) as HTML elements are created
        $answerKey[index] = blankText(answerText);

        // answerKeyCounter is incremented and returned when buildWordArray(index, answerText) is called; returned value is used in layout as placeholder text to number text input fields
        return $answerKeyCounter++;
    }

    function checkAnswers(event) {
        // get NodeList of current state of all of the text input elements
        let theBlanks = document.getElementsByClassName('inputElement');

        for (let item of theBlanks) {
            // if current answer key is a multi-element array (more than one correct answer), attempt to match value of current text input value against a String built by joining the answer key array with a pipe character
            let isMatched = $answerKey[item.id].join("|").indexOf(item.value); // NOTE: String.indexOf returns -1 if no match is found (0 indicates match is at very beginning of string)
            if(item.value && (isMatched > -1)) {
                // visually indicate matched response
                item.classList.remove("incorrectResponse")
                item.classList.add("correctResponse")
                item.disabled = LOCK_CORRECT;
            } else {
                // visually indicate unmatched response
                item.classList.remove("correctResponse")
                item.classList.add("incorrectResponse")
            }
        }
    }
</script>

<form>
    <div id="wordContainer">
        {#each theWords as aWord, i}
            {#if isPlainWord(aWord) }
                <div class="textElement" id="{i}">{aWord}</div>
            {:else}
                <!-- call to buildWordArray(i, aWord) does two things: (1) it returns Number for use with text input tag's placeholder value and (2) it adds aWord to quiz-store.js Array:answerKey for comparing user responses to expected responses -->
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
        background-color: #88FF88;
        color: white;
    }

    :global(.incorrectResponse) {
        /* border: 4px solid red; */
        background-color: #FFCCCC;
        color: white;
    }
</style>
