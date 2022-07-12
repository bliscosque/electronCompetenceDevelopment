<script>
    import {scale} from 'svelte/transition';
    export let name;
</script>

<main>
    <div tarnsiction:scale class="karte">{name}</div>
</main>

<style>
    .karte {
        background-color: lightgray;
        border-radius: 20px;
        padding: 20px;
        margin: 10px 700px;
        font-size: 2em;
    }
</style>