import PocketBase from 'pocketbase';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase('http://127.0.0.1:8090');
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        if (event.locals.pb.authStore.isValid) {
            event.locals.user = event.locals.pb.authStore.model;
        }
    } catch (_) {
        event.locals.pb.authStore.clear();
        event.locals.user = null;
    }

    const response = await resolve(event);

    // Persist auth session in cookies
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

    return response;
};
