export default {}
// /* eslint-env serviceworker, browser */
// /* global Response */

// import { getMultihashFromCidValue, toBase58btc } from '../../lib/utils/block.js';
// import { BlockNotFoundError } from '../../errors.js';

// /**
//  * @typedef {import('../../middleware/env.js').Env} Env
//  */

// /**
//  * Handle block head request
//  *
//  * @param {Request} request
//  * @param {Env} env
//  * @param {import('../../index').Ctx} ctx
//  */
// export async function Head(request, env, ctx) {
// 	const multihashOrCid = request.params.multihash;
// 	const bucketId = ctx.bucketId;

// 	// Permanently redirect to multihash if cid provided
// 	// Note that CIDv0 and multihash encoded as b58btc will be the same
// 	const multihashByCidValue = getMultihashFromCidValue(multihashOrCid);
// 	if (multihashByCidValue && multihashByCidValue !== multihashOrCid) {
// 		return Response.redirect(
// 			request.url.replace(multihashOrCid, multihashByCidValue),
// 			301
// 		);
// 	}

// 	const multihash = await toBase58btc(multihashOrCid, env.bases);
// 	const key = `${bucketId}/${multihash}`;

// 	const r2Object = await env.BLOCKSTORE.head(key);
// 	if (r2Object) {
// 		return new Response(undefined, {
// 			headers: {
// 				'Content-length': `${r2Object.size}`,
// 			},
// 		});
// 	}

// 	throw new BlockNotFoundError();
// }
