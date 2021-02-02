let accessToken: string | null = null;

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const getAccessToken = (s?: string) => {
  s && console.log(s);
  return accessToken;
};
