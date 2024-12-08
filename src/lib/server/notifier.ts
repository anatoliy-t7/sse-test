import { writable, get } from 'svelte/store';
import type { Unsafe } from 'sveltekit-sse';

// Example usage:
// notifier.send({
// 	model: 'notification',
// 	record: form.data,
// 	id: user.id,
// 	action: 'delete'
// });

export type Emitter = {
	id: string | string;
	emit: (eventName: string, data: string) => Unsafe<void, Error>;
};

export type SendEmit = {
	model: string;
	record: any;
	id: number | string;
	action: 'create' | 'update' | 'delete';
};

export const cachedEmitters = writable<Emitter[]>([]);

class Notifier {
	send(sendEmit: SendEmit) {
		const data = get(cachedEmitters);

		const emitters = data.filter((e) => e.id == sendEmit.id);

		if (!emitters.length) {
			return;
		} else {
			emitters.forEach((emitter: Emitter) => {
				const { error } = emitter.emit('notify', JSON.stringify(sendEmit));

				if (error) {
					console.error({ where: 'sse', error });
					return;
				}
			});
		}
	}
}

export const notifier = new Notifier();
