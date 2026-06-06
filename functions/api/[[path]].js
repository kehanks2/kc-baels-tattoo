export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = `https://kc-baels-tattoo-production.up.railway.app${url.pathname}${url.search}`;

  const init = {
    method: context.request.method,
    headers: context.request.headers,
  };

  if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
    init.body = context.request.body;
  }

  return fetch(targetUrl, init);
}
