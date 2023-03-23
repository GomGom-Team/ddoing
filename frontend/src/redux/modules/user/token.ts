const ACCESS_TOKEN_KEY_NAME = "accessToken";

export const setToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
};
