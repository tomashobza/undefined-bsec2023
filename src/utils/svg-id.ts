let counter = 0;
const random =
	typeof crypto !== 'undefined' && crypto.randomUUID
		? function random() {
				return crypto.randomUUID();
		  }
		: function random() {
				return Math.random().toString(36).replace('.', '_');
		  };
export function generateId(def?: string) {
	return `${def || 'svelte-icons'}${random()}${counter++}`;
}

export function nsify() {
	const random = generateId();
	return function (id: string) {
		if (id[0] === '#') return `#${random}${id.substring(1)}`;
		return random + id;
	};
}
