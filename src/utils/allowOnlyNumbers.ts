export const allowOnlyNumbers = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  event.target.value = value.replace(/\D/g, '');
};
