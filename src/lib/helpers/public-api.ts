/**
 * Return appropriate error object for public API errors
 *
 * NOTE: Don't use this helper for APIs that may include sensitive data
 * in error message or stacktrace.
 */
import { error } from '@sveltejs/kit';
import { backendUrl } from '$lib/config';

type Fetch = typeof fetch;
type Params = Record<string, string>;

const controllers: Record<string, AbortController> = {};

export async function fetchPublicApi(fetch: Fetch, endpoint: string, params: Params = {}, abortPrevious = false) {
	let signal: AbortSignal | undefined = undefined;

	if (abortPrevious) {
		controllers[endpoint]?.abort();
		controllers[endpoint] = new AbortController();
		signal = controllers[endpoint].signal;
	}

	const searchParams = new URLSearchParams(params);

	try {
		const resp = await fetch(`${backendUrl}/${endpoint}?${searchParams}`, { signal });
		if (!resp.ok) throw await publicApiError(resp);
		return resp.json();
	} catch (e) {
		if (e.name === 'AbortError') return;
		throw e;
	} finally {
		if (!signal?.aborted) delete controllers[endpoint];
	}
}

export async function publicApiError(response: Response) {
	if (response.status === 404) {
		const stack = [`Server resource not found: ${response.url}`];
		return error(response.status, { message: response.statusText, stack });
	}

	const stack: string[] = [];
	stack.push(`Error loading data from URL: ${response.url}`);
	stack.push(`${response.status} ${response.statusText}`);
	stack.push(await response.text());

	return error(503, { message: response.statusText, stack });
}
