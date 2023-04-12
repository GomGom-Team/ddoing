const SCORE_KEY_NAME = "oneScore";

export const setScore = (score: string) => {
  localStorage.setItem(SCORE_KEY_NAME, score);
};

export const getScore = () => {
  return localStorage.getItem(SCORE_KEY_NAME);
};

export const removeScore = () => {
  localStorage.removeItem(SCORE_KEY_NAME);
};
