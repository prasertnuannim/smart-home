export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ErrorLike {
  message: string;
  type?: string;
  code?: string;
  status?: number;
}

export interface ApiError {
  ok: false;
  error: string;
  type?: string;
  code?: string;
  status?: number;
}
