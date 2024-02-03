import type { NuxtError } from "nuxt/app";
import type { ErrorOpts, RedirectOpts } from "~/types";

/**
 * Composable for handling application errors
 */
export default function () {
  const defaultStatusMessage = 'Error';
  const defaultMessage = 'Oups :( An error has occurred';
  
  /**
   * Wrapper over createError Nuxt method 
   * @param opts error options
   */
  function createMuseError(opts: Partial<ErrorOpts>): NuxtError {
    const { statusMessage, message } = getDefaultErrorMessages(opts);

    return createError({
      ...opts,
      statusMessage,
      message,
    });
  }

  /**
   * Wrapper over showError Nuxt method
   * @param opts error options
   * @returns 
   */
  function showMuseError(opts: Partial<ErrorOpts>): NuxtError {
    const { statusMessage, message } = getDefaultErrorMessages(opts);

    return showError({
      ...opts,
      statusMessage,
      message
    });
  }

  /**
   * Wrapper over clearError Nuxt method
   * @param opts redirect options
   */
  function clearMuseError(opts: RedirectOpts): Promise<void> {
    return clearError({
      ...opts,
    });
  }

  function getDefaultErrorMessages(opts: Partial<ErrorOpts>): { statusMessage: string, message: string } {
    const statusMessage = opts.statusMessage || defaultStatusMessage;
    const message = opts.message || defaultMessage;
    
    return {
      statusMessage,
      message
    };
  }

  return {
    createMuseError,
    clearMuseError,
    showMuseError
  };
}