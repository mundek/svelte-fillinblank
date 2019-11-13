<script>
	import FiB from './routes/FillInBlanks.svelte';
	export let appName;
</script>

<style>
	h1 {
		font-size: 3em;
		padding: 0px 0px 0px 0px;
		margin: 0px 0px 0px 0px;	
	}
</style>

<h1>{appName}</h1>
<FiB />