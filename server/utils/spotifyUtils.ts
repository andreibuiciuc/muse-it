import { randomBytes } from 'crypto';

export type SpotifyResponseType = 'code' | 'error';
export type SpotifyURLParameter = 'code' | 'state' | 'error';
export type SpotifyScope = 'user-read-private' | 'user-read-email';
export type SpotifyGrantType = 'authorization_code';

export type SpotifyAuthPayload = {
  client_id: string,
  response_type: SpotifyResponseType,
  redirect_uri: string,
  state: string
  scope?: string,
  show_dialog?: boolean
};

export type SpotifyTokenResponseBody = {
  access_token: string,
  token_type: string,
  scope: string,
  expires_in: number,
  refresh_token: string,
};

export const generateRandomString = (length: number) => {
  return randomBytes(60).toString('hex').slice(0, length);
}