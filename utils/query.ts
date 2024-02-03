/**
 * Utility function that parses the given or the current URL
 * @param url if not provided, the function will use the current document URL
 */
export const parseURLParams = <Params extends string>(url?: string): Partial<Record<Params, string>> => {
  url = url || process.client ? window.location.href : '';
  const params: Partial<Record<Params, string>> = {};

  if (url) {
    const urlObject = new URL(url);
    
    if (urlObject.searchParams.size) {
      urlObject.searchParams.forEach((value: string, key: string) => {
        params[key as Params] = value;
      });
    }
  }

  return params;
}

/**
 * Utility function that checks if the given or the current URL contains query parameters
 * @param url if not provided, the function will use the current document URL
 * @returns 
 */
export const isURLQueried = (url?: string): boolean => {
  url = url || process.client ? window.location.href : '';
  return url.search(/.+\?.+/) > -1;
};


/**
 * Utility function that redirects to the given or current URL
 * @param url URL to redirect to
 */
export const redirectTo = (url: string) => {
  if (process.client) {
    window.location.href = url;
  }
}