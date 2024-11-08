export const readSesionStorage = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  
};

export const writeSesionStorage = (key, value) => {
  const response = sessionStorage.setItem(key, JSON.stringify(value));
};
