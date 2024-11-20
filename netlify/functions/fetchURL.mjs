import axios from 'axios';

async function handleURL({url, ifModifiedSince}) {
  try {
    const headers = {};

    if (ifModifiedSince) {
      headers['If-Modified-Since'] = ifModifiedSince;
    }

    const res = await axios.get(url, { headers });
    return new Response(res.data, { status: res.status });
  } catch (err) {
    console.log({ err });
    return new Response('Status: 500', { status: 500 })
  }
}

export default async (_req, context) => {
  const params = context.url.searchParams;
  const url = params.get("url");
  // Netlify does not seem to allow If-Modified-Since header, so we have to receive it differently
  // https://docs.netlify.com/platform/caching/#vary-by-header
  const ifModifiedSince = params.get("ifModifiedSince");

  console.log({ url });
  console.log({ context });

  if (url) {
    return await handleURL({url, ifModifiedSince});
  }

  return new Response('', { status: 200 });
}
