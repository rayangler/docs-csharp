import axios from 'axios';

async function handleURL({ url, ifModifiedSince }) {
  try {
    const headers = {};

    if (ifModifiedSince) {
      headers['If-Modified-Since'] = ifModifiedSince;
    }

    const { data, status } = await axios.get(url, {
      headers,
      // 300 status is resolved as 200 by axios for some reason
      validateStatus: (status) => {
        console.log(`Returning status ${status} for ${url}`);
        return status < 400;
      },
    });

    if (status === 304) {
      return new Response(null, { status });
    }

    return new Response(data, { status });
  } catch (err) {
    console.log({ err });
    
    if (axios.isAxiosError(err) && err.response) {
      return new Response(null, { status: err.response.status })
    }
    return new Response(null, { status: 500 })
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
