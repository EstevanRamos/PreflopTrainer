import PocketBase from 'pocketbase';
import { POCKETBASE_URL } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(POCKETBASE_URL);
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
    // TODO: change to secure: true when in production
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

    return response;
};
