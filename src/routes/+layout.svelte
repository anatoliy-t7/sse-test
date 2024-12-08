<script lang="ts">
	import '$lib/css/app.css';
	import { nanoid } from 'nanoid';
	import App from '$lib/state/app.svelte';
	import { source } from 'sveltekit-sse';

	let { children } = $props();

	let userId = nanoid(6);
	let value = $state('');

	const connection = source('/api/notifier', {
		options: {
			headers: {
				userID: userId
			}
		},
		close({ connect }) {
			// connect();
		},
		error({ error }) {
			console.error('subscribe', error);
		}
	});

	App.message = connection.select('notify').transform(function run(data: string) {
		return JSON.parse(data);
	});

	async function send() {
		if (value) {
			await fetch('/api/send', {
				method: 'post',
				body: JSON.stringify({ userId: value })
			});
		}
	}
</script>

<div class="max-w-screen-lg gap-5 p-4 mx-auto space-y-6">
	<div class="flex items-center gap-4">
		<a href="/" class="p-1 hover:underline">Main page</a>
		<a href="/test" class="p-1 hover:underline">Test page</a>
		<button onclick={send} class="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
			Send to
		</button>

		<input
			type="text"
			class="px-3 py-2 border rounded-lg"
			placeholder="userId to send"
			bind:value
		/>

		<div class="flex gap-2">
			My userId: {userId}
		</div>
	</div>

	{@render children()}
</div>
