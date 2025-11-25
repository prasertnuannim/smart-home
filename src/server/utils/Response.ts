export const ok = (data: any) => ({
  ok: true,
  data,
});

export const fail = (error: any) => ({
  ok: false,
  error: error.message,
  code: error.code,
});
