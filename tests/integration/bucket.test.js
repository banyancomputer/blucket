import { describe, expect, it, beforeAll, afterAll } from "vitest";
import * as util from '../utils'

describe("Bucket Integration", () => {
	let api;

	beforeAll(async () => {
		api = await util.getWorker();
	});

	afterAll(async () => {
		await api.stop();
	});

	it("should fail at attempting to create an extant bucket", async () => {
		// Create a bucket
		const put_resp = await api.fetch('', {
			headers: {
				...util.getAuthHeader(),
				...util.getBucketIdHeader(),
			},
			method: 'PUT'
		});
		expect(put_resp).toBeDefined();
		expect(put_resp.status).toBe(400);
	});

	it("should fail at attempting to delete a non-empty bucket", async () => {
		// Put a block in the bucket
		const data = util.getRandomData();
		const put_resp = await api.fetch(`block/put`, {
			headers: {
				...util.getAuthHeader(),
				...util.getBucketIdHeader(),
			},
			body: data,
			method: 'POST'
		}).then(r => r.json());
		expect(put_resp).toBeDefined();
		expect(put_resp.Key).toBeDefined();

		// Delete the bucket
		const delete_resp = await api.fetch('', {
			headers: {
				...util.getAuthHeader(),
				...util.getBucketIdHeader(),
			},
			method: 'DELETE'
		});
		expect(delete_resp).toBeDefined();
		expect(delete_resp.status).toBe(400);
	});

	it("should succeed at creating and immediately deleting a bucket", async () => {
		// Create a bucket
		const bucket_header = util.getRandomBucketIdHeader();
		const put_resp = await api.fetch('', {
			headers: {
				...util.getAuthHeader(),
				...bucket_header,
			},
			method: 'PUT'
		});
		expect(put_resp).toBeDefined();
		expect(put_resp.status).toBe(200);

		// Delete the bucket
		const delete_resp = await api.fetch('', {
			headers: {
				...util.getAuthHeader(),
				...bucket_header,
			},
			method: 'DELETE'
		});
		expect(delete_resp).toBeDefined();
		expect(delete_resp.status).toBe(200);
	});

	it("should succeed at creating a bucket, putting a block in it, removing the block, and deleting the bucket", async () => {
		// Create a bucket
		const bucket_header = util.getRandomBucketIdHeader();
		const put_resp = await api.fetch('', {
			headers: {
				...util.getAuthHeader(),
				...bucket_header,
			},
			method: 'PUT'
		});
		expect(put_resp).toBeDefined();
		expect(put_resp.status).toBe(200);

		// Put a block in the bucket
		const put_block_resp = await api.fetch(`block/put`, {
			headers: {
				...util.getAuthHeader(),
				...bucket_header,
			},
			body: "Hello, World!",
			method: 'POST'
		}).then(r => r.json());
		expect(put_block_resp).toBeDefined();
		expect(put_block_resp.Key).toBeDefined();

		// Delete the block from the bucket
		const delete_block_resp = await api.fetch(`block/rm?arg=${put_block_resp.Key}`, {
			headers: {
				...util.getAuthHeader(),
				...bucket_header,
			},
			method: 'DELETE'
		}).then(r => r.json());
		expect(delete_block_resp).toBeDefined();
		expect(delete_block_resp.Hash).toBe(put_block_resp.Key);

		// Delete the bucket
		const delete_resp = await api.fetch('', {
			headers: {
				...util.getAuthHeader(),
				...bucket_header,
			},
			method: 'DELETE'
		});
		expect(delete_resp).toBeDefined();
		expect(delete_resp.status).toBe(200);
	});

	it("should succeed at updating and retrieving the root CID of a bucket", async () => {
		// Update the root CID of the bucket
		const put_root_resp = await api.fetch('', {
			headers: {
				...util.getAuthHeader(),
				...util.getBucketIdHeader(),
			},
			body: JSON.stringify({
				rootCid: "badc0de",
			}),
			method: 'POST'
		});
		expect(put_root_resp).toBeDefined();
		expect(put_root_resp.status).toBe(200);

		// Get the root CID of the bucket
		const get_root_resp = await api.fetch('', {
			headers: {
				...util.getAuthHeader(),
				...util.getBucketIdHeader(),
			},
			method: 'GET'
		}).then(r => r.json());
		expect(get_root_resp).toBeDefined();
		expect(get_root_resp.rootCid).toBe("badc0de");
	});
});
