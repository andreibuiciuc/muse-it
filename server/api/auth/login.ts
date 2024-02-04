import { stringify } from 'querystring';
import { SpotifyAuthPayload, SpotifyScope, generateRandomString } from '../../utils/spotifyUtils';
  
export default defineEventHandler(async _ => {
  const config = useRuntimeConfig();
  const state = generateRandomString(16);
  const scope = ['user-read-private', 'user-read-email'] as SpotifyScope[];

  const payload: SpotifyAuthPayload = {
    response_type: 'code',
    client_id: config.spotifyClientId,
    redirect_uri: config.spotifyRedirectUri,
    scope: scope.join(' '),
    state,
  };

  await useStorage('users').setItem('authState', state);

  return {
    redirectUrl: `${config.spotifyAuthUrl}?${stringify(payload)}`
  };
});