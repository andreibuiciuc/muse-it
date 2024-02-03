export type ErrorOpts = {
  url: string;  
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: any;
  fatal?: boolean;
};

export type RedirectOpts = {
  redirect?: string
};

