/* eslint-disable @typescript-eslint/no-explicit-any */
import { serializeNonPOJOs } from '$lib/helpers';

export const load = ({ locals }: any) => {

	if (locals.user && locals.user) {
		return {
			profile: serializeNonPOJOs(locals.user)
		};
	}
};
