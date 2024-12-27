import { serializeNonPOJOs } from '$lib/helpers';
import type { Locals } from '$lib/types';

export const load = ({ locals }: {locals: Locals}) => {

	if (locals.user && locals.user) {
		return {
			profile: serializeNonPOJOs(locals.user)
		};
	}
};
