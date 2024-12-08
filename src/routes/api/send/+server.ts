import { notifier } from '$lib/server/notifier';
import { json } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export async function POST({ request }) {
	const data = await request.json();

	notifier.send({
		model: 'attachment',
		record: { id: nanoid() },
		id: data.userId,
		action: 'create'
	});

	return json({ status: 200 });
}
