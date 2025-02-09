import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your actual PocketBase URL

// Only load auth state in the browser
if (typeof window !== 'undefined') {
    pb.authStore.loadFromCookie(document.cookie);
    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie();
    });
}
