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
</script>

<style>
	#wordContainer {
		min-width: 100px;
		max-width: 650px;
	}

	.textElement {
		display: inline-block;
		margin: 3px 3px;
		padding: 3px 3px 12px 3px;
		color: red;
		font-size: 1em;
		background-color: chartreuse;
        text-align: left;
        user-select: none;
		cursor: pointer;
	}

    .inputElement {
		display: inline-block;
		margin: 0px 0px;
		padding: 0px 0px 0px 0px;
		color: red;
		font-size: 1em;
        font: 1em/1.25em "Times New Roman", Times, serif;
        font-weight: bolder;
		background-color:white;
        text-align: center;
	}

</style>

<p>{$sentence}</p>
<div id="wordContainer">
    {#each theWords as aWord, i}
        {#if isPlainWord(aWord) }
            <!-- <div class="item">{aWord}&nbsp;-&nbsp;</div> -->
            <div class="textElement" id="{i}">{aWord}</div>
        {:else}
            <div class="textElement">
                {blankPretext(aWord)}<input type="text" class="inputElement" id="{i}" size={blankTextLength(aWord)}>{blankPosttext(aWord)}
            </div>
        {/if}
    {/each}
</div>