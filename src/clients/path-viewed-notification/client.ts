import { patchFetch } from '../customFetch';

export default async (id: number): Promise<unknown> => patchFetch(`notifications/${id}/viewed`, null, {
    withoutBodyResponse: true
}, {
    responseError: 'error.setNotificationViewedFetch',
    defaultError: 'error.setNotificationViewedParse',
});
