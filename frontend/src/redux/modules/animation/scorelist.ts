const SCORE_LIST_KEY_NAME = "manyScore";

export const setScoreList = (score: string) => {
  localStorage.setItem(SCORE_LIST_KEY_NAME, score);
};

export const getScoreList = () => {
  return localStorage.getItem(SCORE_LIST_KEY_NAME);
};

export const removeScoreList = () => {
  localStorage.removeItem(SCORE_LIST_KEY_NAME);
};
