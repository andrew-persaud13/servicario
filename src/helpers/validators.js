export const isValidImage = value => {
  const result = initChecks(value);

  if (result !== null) return result;

  const validFormats = ['png', 'jpeg', 'jpg', 'svg'];

  const extension = value.split('.').pop();

  return validFormats.includes(extension);
};

export const isValidUrl = value => {
  const result = initChecks(value);
  if (result !== null) return result;

  const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const regex = new RegExp(pattern);

  return value.match(regex);
};

export const sameAs = (getValue, field) => value => {
  const result = initChecks(value);
  if (result !== null) return result;
  return value === getValue(field);
};

const initChecks = value => {
  if (!value) return true;
  if (typeof value !== 'string') return false;

  return null;
};
