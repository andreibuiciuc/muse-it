<script lang="ts" setup>
import type { SpotifyURLParameter } from '~/server/utils/spotifyUtils';

const { showMuseError } = useMuseError();

async function initiateSpotifyAuthorization() {
  if (isURLQueried()) {
    const currentParams = parseURLParams<SpotifyURLParameter>();

    if (currentParams.code) {
      await handleAuthorizationSuccess(currentParams.code, currentParams.state!);
    } else if (currentParams.error) {
      throw showMuseError({ statusCode: 404, statusMessage: currentParams.error, fatal: true });
    }
  } else {
    await authorizeSpotify();
  }
}

async function authorizeSpotify() {
  const { data, error } = await useFetch('/api/auth/login');

  if (data.value && data.value.redirectUrl) {
      redirectTo(data.value.redirectUrl);
  } else if (error.value) {
    throw showMuseError({ ...error.value, fatal: true });
  }

}

async function handleAuthorizationSuccess(code: string, state: string) {
  const { data, error } = await useFetch('/api/auth/token', { params: { code, state }});

  if (data.value) {
    localStorage.setItem('accessToken', data.value.access_token);
    localStorage.setItem('refreshToken', data.value.refresh_token);
  } else if (error.value) {
    throw showMuseError({ ...error.value, fatal: true });
  }
}

onMounted(async () => {
  await nextTick();
  await initiateSpotifyAuthorization();
});

</script>

<template>
  <h1>hej</h1>
</template>