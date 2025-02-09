export const actions = {
    logout: async ({ locals }) => {
        locals.pb.authStore.clear();
        locals.user = null;
        return { success: true };
    }
};