import webPush from 'web-push';
import { WEBPUSH_PRIVATE, WEBPUSH_PUBLIC } from '../config.js';

// Configura las claves VAPID

export const webPushTool = () => {
    webPush.setVapidDetails(
        'mailto:helados@example.com',
        WEBPUSH_PUBLIC,
        WEBPUSH_PRIVATE
    );
}
