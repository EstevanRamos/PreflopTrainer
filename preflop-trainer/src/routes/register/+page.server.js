export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());

        try {
            const user = await locals.pb.collection('users').create(data);

            const authdata = await locals.pb.collection('users').authWithPassword(data.email, data.password);

            console.log(authdata);

            locals.pb.authstore.clear()
        } catch (error) {
            // Convert the error object to a serializable format
            return { 
                error: true, 
                message: JSON.stringify(error, Object.getOwnPropertyNames(error))
            };
        }

        throw redirect(303, '/login');
    }
};
