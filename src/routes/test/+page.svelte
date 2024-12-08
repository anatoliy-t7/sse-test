<script lang="ts">
	import App from '$lib/state/app.svelte';
	import { watch } from 'runed';

	let message = $derived(App.message);
	let data = $state({});

	watch(
		() => $message?.record,
		() => {
			console.log('new message', $message);
			data = $message;
		}
	);
</script>

<h1>Test page</h1>

<div class="flex items-center gap-2">
	message:

	{#if data}
		{JSON.stringify(data)}
	{/if}
</div>
