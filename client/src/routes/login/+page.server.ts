/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';

export const load = ({ locals }: any)=> {
	console.log(8144, locals);

	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}

};

export const actions = {
	login: async ({ request, locals }: { request: RequestEvent['request'], locals: any }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			const { record, token } = await locals.pb.collection('users').authWithPassword(data.email, data.password);
			console.log('Auth data:', record, token);
		} catch (err) {
			console.log('Error:', err);
			return {
				error: true,
				email: data.email
			};
		}
		throw redirect(303, '/');
	}
};
