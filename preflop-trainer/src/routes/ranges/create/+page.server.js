import { error, redirect } from '@sveltejs/kit';

export const actions = {
    create: async ({request, locals}) => {
    const formData = await request.formData();
    formData.append('user', locals.user.id);
    //console.log(formData);
    
    try{
        await locals.pb.collection('ranges').create(formData);

    } catch (error) {
        console.log(error);
        throw error(error.status, error.message);
    }

    throw redirect(303, '/dashboard');

    }
}
