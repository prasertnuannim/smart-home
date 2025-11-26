export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ErrorLike {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiError {
  ok: false;
  error: string;
  code?: string;
  status?: number;
}
