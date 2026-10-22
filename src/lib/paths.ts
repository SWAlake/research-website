export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const materialUrl = (path: string) => /^https?:\/\//.test(path) ? path : url(path);
