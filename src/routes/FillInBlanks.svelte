<script>
    import {
        sentence,
        currentResponse
    } from '../stores/quiz-store.js';

    import {
        sentenceWords,
        isPlainWord,
        blankPretext,
        blankPosttext,
        blankText,
        blankTextLength
    } from '../utils/word-work.js';

    let theWords = sentenceWords($sentence);

    let displayItems = [];

    function currentSentence() {
        console.log("currSent");
    }

    function resizeInput(event) {
        let newLength = event.target.value.length;
        if(newLength > 1) { event.target.size = newLength - 1; }
        else { event.target.size = newLength; }
        // console.table(event.target.value.length);
    }

</script>

<p>{$sentence}</p>
<div id="wordContainer">
    {#each theWords as aWord, i}
        {#if isPlainWord(aWord) }
            <!-- <div class="item">{aWord}&nbsp;-&nbsp;</div> -->
            <div class="textElement" id="{i}">{aWord}</div>
        {:else}
            <div class="textElement">
                {blankPretext(aWord)}<input type="text" class="inputElement" id="{i}" size=4 placeholder="..." on:input={resizeInput}>{blankPosttext(aWord)}
            </div>
        {/if}
    {/each}
</div>


<style>
	#wordContainer {
		min-width: 100px;
		max-width: 800px;
        /* padding: 1em 1em 1em 1em; */
	}

	.textElement {
		display: inline-block;
		margin: .2em .2em;
		padding: 0em 0em .4em 0em;
		color: #040404;
		font-size: 1em;
		/* background-color: #04CC04; */
        text-align: left;
        user-select: none;
		cursor: pointer;
	}

    .inputElement {
		display: inline-block;
		margin: 0px 0px;
		padding: 0px 0px 0px 0px;
		color: #1010CC;
		font-size: 1em;
        font: "Times New Roman", Times, serif;
        font-weight: bolder;
		background-color:white;
        text-align: left;
	}

</style>
