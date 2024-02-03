import useMuseError from "~/composables/useMuseError";
import { SpotifyTokenResponseBody } from "~/server/utils/spotifyUtils";

export default defineEventHandler(async (event) => {
  const { createMuseError } = useMuseError();

  const config = useRuntimeConfig();
  const query = getQuery(event);
  
  const code = query.code as string || null;
  const state = query.state as string || null;
  const authState = await useStorage('users').getItem('authState');

  if (state === null || state !== authState) {
    throw createMuseError({ 
      statusCode: 404,
      statusMessage: 'state mismatch'
    });
  } 
  
  if (code === null) {
    throw createMuseError({
      statusCode: 404,
      statusMessage: 'invalid code'
    });
  }

  try {
    const response = await $fetch<SpotifyTokenResponseBody>(config.spotifyTokenUrl, {
      method: 'POST',
      body: new URLSearchParams({
        code,
        redirect_uri: config.spotifyRedirectUri,
        grant_type: 'authorization_code'
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(config.spotifyClientId + ':' + config.spotifyClientSecret).toString('base64'))
      },
    });

    if (response) {
      const access_token = response.access_token;
      const refresh_token = response.refresh_token;
  
      await useStorage('users').setItem('accessToken', access_token);
      await useStorage('users').setItem('refreshToken', refresh_token);
  
      return {
        access_token,
        refresh_token
      };
    }
  } catch (_) {
    throw createMuseError({
      statusCode: 500,
      statusMessage: 'error has occured'
    })
  }
});