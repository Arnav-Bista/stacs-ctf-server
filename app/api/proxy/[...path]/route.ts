import { NextRequest } from 'next/server';

// Map of allowed last-path segments to upstream URLs
const UPSTREAMS: Record<string, string> = {
    calculatorone: 'https://ekh9.teaching.cs.st-andrews.ac.uk/ctfchallenges/calculatorone',
    calculatortwo: 'https://ekh9.teaching.cs.st-andrews.ac.uk/ctfchallenges/calculatortwo',
    message: 'https://ekh9.teaching.cs.st-andrews.ac.uk/ctfchallenges/message',
    getallmessages: 'https://ekh9.teaching.cs.st-andrews.ac.uk/ctfchallenges/getallmessages',
    bigarray: 'https://ekh9.teaching.cs.st-andrews.ac.uk/ctfchallenges/bigarray',
};

const HOP_BY_HOP = new Set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
]);

async function proxy(request: Request) {
    const reqUrl = new URL(request.url);
    const segments = reqUrl.pathname.split('/').filter(Boolean);

    // find the segment after the 'proxy' segment, e.g. /api/proxy/<key>/... -> key
    const proxyIndex = segments.indexOf('proxy');
    const key = proxyIndex >= 0 && segments.length > proxyIndex + 1 ? segments[proxyIndex + 1] : segments[segments.length - 1] ?? '';
    const restSegments = proxyIndex >= 0 && segments.length > proxyIndex + 2 ? segments.slice(proxyIndex + 2) : [];

    // Special handling: client uses '/message' endpoints but upstream exposes '/message' and '/getallmessages'
    let upstreamBase: string | undefined;
    if (key === 'message') {
        if (request.method === 'GET' && restSegments.length === 0) {
            // list all messages -> upstream /getallmessages
            upstreamBase = UPSTREAMS['getallmessages'];
        } else {
            // create/get/delete specific -> upstream /message (append id if present)
            upstreamBase = UPSTREAMS['message'];
        }
    } else if (key === 'bigarray') {
        // For bigarray, we want to forward to the same endpoint regardless of the next segment, since the backend handles routing based on method and body
        upstreamBase = UPSTREAMS['bigarray'];
    } else {
        upstreamBase = UPSTREAMS[key];
    }

    if (!upstreamBase) return new Response('Not found', { status: 404 });

    // Build target URL by appending any remaining path segments to the upstream base
    let target = new URL(upstreamBase);
    if (restSegments.length > 0) {
        // ensure no duplicate slashes
        const suffix = restSegments.map(encodeURIComponent).join('/');
        // preserve any existing path on upstreamBase
        target = new URL(target.toString().replace(/\/+$/, '') + '/' + suffix);
    }
    target.search = reqUrl.search; // forward query string

    console.log(`Proxying request: ${request.method} ${reqUrl.pathname} -> ${target.pathname}`);

    // Forward headers (remove host and hop-by-hop headers)
    const forwardHeaders = new Headers(request.headers);
    forwardHeaders.delete('host');
    for (const h of HOP_BY_HOP) forwardHeaders.delete(h);

    const body =
    ['GET', 'HEAD'].includes(request.method)
        ? undefined
        : await request.arrayBuffer();

    const init: RequestInit = {
        method: request.method,
        headers: forwardHeaders,
        body,
        redirect: 'manual',
    };

    const upstreamRes = await fetch(target.toString(), init);

    console.log(`Received response from upstream: ${upstreamRes.status} ${upstreamRes.statusText}`);

    // Build response headers, filtering hop-by-hop headers
    const responseHeaders = new Headers();
    upstreamRes.headers.forEach((value, key) => {
        if (!HOP_BY_HOP.has(key.toLowerCase())) responseHeaders.set(key, value);
    });

    // Basic CORS passthrough (adjust as needed)
    if (!responseHeaders.has('access-control-allow-origin')) {
        responseHeaders.set('access-control-allow-origin', '*');
    }

    // If 500 response with the word "crashed" then this is expected, print an explanation in the console for clarity
    if (upstreamRes.status === 500) {
        console.warn(`Upstream server responded with 500. This is a FAKE CRASH, everything is fine please ignore, the next line will be a 500 error, IGNORE IT :)`); 
    }


    return new Response(upstreamRes.body, {
        status: upstreamRes.status,
        statusText: upstreamRes.statusText,
        headers: responseHeaders,
    });
}

// Export handlers for common HTTP methods
export async function GET(request: Request) {
    return proxy(request);
}
export async function POST(request: Request) {
    return proxy(request);
}
export async function PUT(request: Request) {
    return proxy(request);
}
export async function PATCH(request: Request) {
    return proxy(request);
}
export async function DELETE(request: Request) {
    return proxy(request);
}
export async function OPTIONS(request: Request) {
    return proxy(request);
}
export async function HEAD(request: Request) {
    return proxy(request);
}