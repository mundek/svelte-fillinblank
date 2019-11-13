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
        blankText
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

	#wordContainer>div {
		display: inline-block;
		margin: 3px 3px;
		padding: 3px 3px 12px 3px;
		color: red;
		font-size: 1em;
		background-color: chartreuse;

		cursor: pointer;
		/* text-shadow: 0 0 20px rgba(0,0,0,0.3); */
	}
</style>

<p>{$sentence}</p>
<div id="wordContainer">
    {#each theWords as aWord, i}
        {#if isPlainWord(aWord) }
            <!-- <div class="item">{aWord}&nbsp;-&nbsp;</div> -->
            <div class="item">{aWord}</div>
        {:else}
            <div class="item">
                {blankPretext(aWord)}
                <input type="text" name="i">
                {blankPosttext(aWord)}
            </div>
        {/if}
    {/each}
</div>