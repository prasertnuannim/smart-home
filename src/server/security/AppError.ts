export const createAppError = (code: string, message: string, status = 400) => {
  return { isAppError: true, code, message, status };
};
