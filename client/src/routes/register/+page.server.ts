/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@sveltejs/kit';


export const load = ({ locals }: any) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};

export const actions = {
	register: async ({ locals, request } : {locals: any, request: any}) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		// Debugging: Check if locals.pb and locals.pb.users are defined
		console.log('locals.pb:', locals.pb);
		console.log('locals.pb.users:', locals.pb.users);

		if (!locals.pb || !locals.pb.users) {
			return {
				error: true,
				message: 'PocketBase is not properly initialized'
			};
		}

		try {
			const newUser = await locals.pb.users.create({...data});
			console.log(555, newUser);
			const {record, token} = await locals.pb.collection('users').authWithPassword(data.email, data.password);
			console.log('Auth data:', record, token);

			locals.pb.authStore.clear();
		} catch (err: any) {
			console.log('Error:', err.response.data);
			return {
				error: true,
				message: err.message || 'An error occurred'
			};
		}

		throw redirect(303, '/login');
	}
};
