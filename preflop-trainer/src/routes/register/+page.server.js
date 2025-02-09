export const actions = {
    signup: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');

        try {
            await locals.pb.collection('users').create({
                email,
                password,
                passwordConfirm
            });
            return { success: true };
        } catch (error) {
            return { error: error.message };
        }
    }
};
