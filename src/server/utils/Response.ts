import { ApiError, ApiSuccess, ErrorLike } from "@/types/response";

export const ok = <T>(data: T): ApiSuccess<T> => ({
  ok: true,
  data,
});

export const fail = (error: ErrorLike): ApiError => ({
  ok: false,
  error: error.message,
  code: error.code,
  status: error.status,
});
