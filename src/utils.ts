export const uid = (len: number = 8): string => {
  const buf: string[] = [];
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charlen = chars.length;

  for (let i = 0; i < len; i++) {
    buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
  }

  return buf.join('');
};

export const isKeyMatchRootId = (key: string, rootId: string) => {
  const [keyRootId] = key.split('.');
  return keyRootId === rootId;
};
