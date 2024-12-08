import { cachedEmitters } from '$lib/server/notifier';
import { produce } from 'sveltekit-sse';

export async function POST({ request }) {
	const userId = request.headers.get('userId');

	console.log('userId', userId);

	return produce(
		function start({ emit }) {
			// Cache the emitter
			const newEmit = {
				id: userId,
				emit
			};

			updateStore(cachedEmitters, newEmit);

			emit('notify', JSON.stringify({ model: 'ping' }));
		},
		{
			stop() {
				console.log('produce stop');

				removeFromStore(cachedEmitters, userId);
			}
		}
	);
}

function updateStore(store, update) {
	store.update(function upsert(objects) {
		const object = objects.find((o) => o.id == update.id);
		if (object) {
			Object.assign(object, update);
		} else {
			objects.push(update);
		}
		return objects;
	});
}

function removeFromStore(store, id) {
	store.update(function removeFrom(objects) {
		return objects.filter(function exceptWithId(object) {
			return object.id !== id;
		});
	});
}
