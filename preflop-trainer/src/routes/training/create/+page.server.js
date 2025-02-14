/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
    // Redirect if not authenticated
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login');
    }

    try {
        const ranges = await locals.pb.collection('ranges').getFullList({
            filter: `user = "${locals.user.id}"`,
            sort: '-created'
        });
        console.log(locals.user);
        
        return {
            ranges: ranges,
            user: JSON.parse(JSON.stringify(locals.user))
        };
    } catch (err) {
        console.error('Error fetching ranges:', err);
        return {
            ranges: []
        };
    }
};

export const actions = {
    create: async ({request, locals}) => {
    const formData = await request.formData();
    formData.append('user', locals.user.id);
    
    try{
        const scenario = await locals.pb.collection('scenarios').create(formData);
        console.log(scenario);

        return {
            success: true,
            scenario: scenario.id
        };


    } catch (error) {
        console.log(error);
        throw error(error.status, error.message);
    }

    

    }
}