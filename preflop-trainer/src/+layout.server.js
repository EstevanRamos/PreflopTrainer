export const load = ({ locals }) => {
    return {
        user: locals.user || null // Ensure user is accessible in Svelte
    };
};
