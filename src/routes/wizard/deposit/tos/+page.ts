import '$lib/wallet/client';
import { multicall } from '@wagmi/core';
import type { Abi } from 'viem';
import tosABI from '$lib/eth-defi/abi/TermsOfService.json';

// TODO: this will come from wizard.data.contracts
const address = '0xc0a66f20EEb3115a77cAB71ecbEE301fcf2eD5fa';

export async function load({ fetch }) {
	const [canProceed, version] = await multicall({
		contracts: ['canProceed', 'latestTermsOfServiceVersion'].map((functionName) => ({
			address,
			abi: tosABI as Abi,
			functionName
		}))
	}).then((response) => response.map((item) => item.result));

	// Temoporary hack - all versions = v0 until we launch
	// const fileName = `v${version}.txt`;
	const fileName = 'v0.txt';

	let tosText: string | undefined;

	try {
		const resp = await fetch(`/tos/${fileName}`);
		if (!resp.ok) throw new Error(resp.statusText);
		tosText = await resp.text();
	} catch (e) {
		console.error(e);
	}

	return { version, fileName, tosText, canProceed: Boolean(canProceed) };
}
