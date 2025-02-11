import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
    if (locals.user && locals.pb.authStore.isValid) {
        return {
            user: JSON.parse(JSON.stringify(locals.user))
        };
    }else{
        throw redirect(303, '/login');
    }
};