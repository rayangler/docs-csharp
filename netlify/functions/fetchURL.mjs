import axios from 'axios';

async function handleURL(url, receivedHeaders) {
  try {
    const headers = {};

    // Allowlist of headers
    const ifModifiedSinceKey = 'If-Modified-Since';
    const ifModifiedSinceHeader = receivedHeaders?.[ifModifiedSinceKey];
    if (ifModifiedSinceHeader) {
      headers[ifModifiedSinceKey] = ifModifiedSinceHeader;
    }

    const res = await axios.get(url, { headers });
    return new Response(res.data, { status: res.status });
  } catch (err) {
    console.log({ err });
    return new Response('Status: 500', { status: 500 })
  }
}

export default async (req, context) => {
  const params = context.url.searchParams;
  const url = params.get("url");
  const { headers } = req;

  console.log({ url });
  console.log({ context });

  if (url) {
    return await handleURL(url, headers);
  }

  return new Response('', { status: 200 });
}
