export const sanitiseOutput = (unsanitised: string) => {
  const stringsToRemove = ['```html', '```'];

  let sanitised = unsanitised;
  stringsToRemove.forEach((str) => {
    sanitised = sanitised.replace(new RegExp(str, 'g'), '');
  });

  return sanitised.trim();
};
