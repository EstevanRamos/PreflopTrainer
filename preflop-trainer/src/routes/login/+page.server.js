import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const authdata = await locals.pb.collection('users').authWithPassword(email, password);
        } catch (error) {
            console.log(error);
            return { error: true, message: error.message };
        }

        throw redirect(303, '/dashboard');

    }
};
