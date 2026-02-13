import { NextRequest } from 'next/server';

// Map of allowed last-path segments to upstream URLs
const UPSTREAMS: Record<string, string> = {
    calculatorone: 'https://ekh9.teaching.cs.st-andrews.ac.uk/ctfchallenges/calculatorone',
    calculatortwo: 'https://ekh9.teaching.cs.st-andrews.ac.uk/ctfchallenges/calculatortwo',
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
    const last = segments[segments.length - 1] ?? '';

    const upstreamBase = UPSTREAMS[last];
    if (!upstreamBase) return new Response('Not found', { status: 404 });

    const target = new URL(upstreamBase);
    target.search = reqUrl.search; // forward query string

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

    // Build response headers, filtering hop-by-hop headers
    const responseHeaders = new Headers();
    upstreamRes.headers.forEach((value, key) => {
        if (!HOP_BY_HOP.has(key.toLowerCase())) responseHeaders.set(key, value);
    });

    // Basic CORS passthrough (adjust as needed)
    if (!responseHeaders.has('access-control-allow-origin')) {
        responseHeaders.set('access-control-allow-origin', '*');
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