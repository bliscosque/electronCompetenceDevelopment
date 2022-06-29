<script>
	let name = "Svelte";
	import Teilnehmer from "./Teilnehmer.svelte";

	let teilnehmer = [
		"Tom", "Max", "Eva"
	]

	const neuTeilnehmer = () => {
		teilnehmer=[...teilnehmer, name]
		name=""
	}

</script>

<main>
	<h1>Hello {name}!</h1>
	<input type="text" bind:value={name}>
	<button on:click={(neuTeilnehmer)}>Neu</button>
	{#each teilnehmer as person}
		<Teilnehmer name={person}/>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>