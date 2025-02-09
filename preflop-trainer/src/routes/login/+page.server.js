export const actions = {
    login: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            await locals.pb.collection('users').authWithPassword(email, password);

            // Store authenticated user in locals
            locals.user = locals.pb.authStore.model;
            console.log('User:', locals.user);

            return { success: true };
        } catch (error) {
            return { error: error.message };
        }
    }
};
