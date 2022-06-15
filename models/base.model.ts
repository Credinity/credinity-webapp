export interface Error {
  code?: string;
  target?: any;
  message?: string;
}

export interface BaseApiResponse {
  successMessage: null;
  requestId: string;
  isSuccess: boolean;
  errors: Error[];
}

export interface BaseApiRequest {
  requestId: string;
}
