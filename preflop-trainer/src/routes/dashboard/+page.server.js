import { redirect } from '@sveltejs/kit';

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