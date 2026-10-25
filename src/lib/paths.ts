export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const materialUrl = (path: string) => /^https?:\/\//.test(path) ? path : url(path);
export const paperUrl = (paper: { id: string; data: { externalOnly?: boolean; externalUrl?: string } }) =>
  paper.data.externalOnly && paper.data.externalUrl ? paper.data.externalUrl : url(`papers/${paper.id}/`);
