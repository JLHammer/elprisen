// localStorage throws when it's unavailable (e.g. private mode), values then only last for this session
export const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Nothing to do, see above
  }
};
