<script>
	import { page } from '$app/stores';
</script>

<main class="relative h-full">
	<div class="px-6 py-32 mx-auto text-center max-w-7xl sm:py-40 lg:px-8">
		<p class="text-6xl font-semibold leading-8">
			{$page.status}
		</p>

		<h1 class="pt-10 text-2xl font-bold tracking-tight">
			{$page.error?.message}
		</h1>

		<div class="flex justify-center pt-10">
			<a href="/" class="text-xl leading-7 unstyled hover:underline">
				<span aria-hidden="true" class="pr-1">&larr;</span>
				Back
			</a>
		</div>
	</div>
</main>
