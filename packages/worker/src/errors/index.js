import { JSONResponse } from './../utils';
/**
 * Our Error handler
 * @param {Error & {status?: number;code?: string; contentType?: string;}} err
 */
export function errorHandler(err) {
	console.error(err.stack);
	const status = err.status || 500;
	return new JSONResponse(err.message || 'Server Error', { status });
}

/**
 * Basic HTTP Error
 * @extends Error
 * @property {number} status
 * @property {string} code
 */
export class HTTPError extends Error {
	constructor(message, status = 500) {
		super(message);
		this.name = 'HTTPError';
		this.status = status;
	}
}

/* Authentication errors */

/**
 * No Authorization header provided
 */
export class NoAuthError extends HTTPError {
	constructor(msg = 'No Authorization header provided') {
		super(msg, 401);
		this.name = 'NoToken';
		this.code = NoAuthError.CODE;
	}
}
NoAuthError.CODE = 'ERROR_NO_AUTH';

/**
 * When the Authorization header is not in the `Basic {token}` format, but expected to be
 */
// export class ExpectedBasicStringError extends HTTPError {
// 	constructor(
// 		msg = 'Expected argument to be a string in the `Basic {token}` format'
// 	) {
// 		super(msg, 401);
// 		this.name = 'ExpectedBasicString';
// 		this.code = ExpectedBasicStringError.CODE;
// 	}
// }
// ExpectedBasicStringError.CODE = 'ERROR_EXPECTED_BASIC_STRING';

/**
 * When the Authorization header is not in the `Bearer {token}` format, but expected to be
 */
export class ExpectedBearerStringError extends HTTPError {
	constructor(
		msg = 'Expected argument to be a string in the `Bearer {token}` format'
	) {
		super(msg, 401);
		this.name = 'ExpectedBearerString';
		this.code = ExpectedBearerStringError.CODE;
	}
}
ExpectedBearerStringError.CODE = 'ERROR_EXPECTED_BEARER_STRING';

/**
 * The authorization header is in the correct format for the requested resource, but the token is invalid or badly formatted
 */
export class InvalidTokenError extends HTTPError {
	constructor(msg = 'Provided token is invalid') {
		super(msg, 401);
		this.name = 'NoValidToken';
		this.code = InvalidTokenError.CODE;
	}
}
InvalidTokenError.CODE = 'ERROR_INVALID_AUTH_TOKEN';

/*
 * When an access key doesn't exist
 */
export class AccessKeyNotFoundError extends HTTPError {
	constructor(msg = 'Access key not found') {
		super(msg, 401);
		this.name = 'AccessKeyNotFound';
		this.code = AccessKeyNotFoundError.CODE;
	}
}
AccessKeyNotFoundError.CODE = 'ERROR_ACCESS_KEY_NOT_FOUND';

/* Bucket Errors */

/**
 * No bucket id specified in the request
 */
export class NoBucketIdError extends HTTPError {
	constructor(msg = 'No bucket id specified in the request. Please specify a bucket id in the `x-bucket-id` header') {
		super(msg, 400);
		this.name = 'NoBucketId';
		this.code = NoBucketIdError.CODE;
	}
}
NoBucketIdError.CODE = 'ERROR_NO_BUCKET_ID';


/**
 * The bucket that is being authenticated against doesn't exist
 */
export class BucketNotFoundError extends HTTPError {
	constructor(msg = 'Provided token is invalid') {
		super(msg, 404);
		this.name = 'BucketNotFound'
		this.code = BucketNotFoundError.CODE;
	}
}
BucketNotFoundError.CODE = 'ERROR_BUCKET_NOT_FOUND';

/**
 * The bucket that is being created already exists
 * @extends HTTPError
 * @property {string} bucketId
 */
export class BucketAlreadyExistsError extends HTTPError {
	constructor(bucketId, msg = `Bucket ${bucketId} already exists`) {
		super(msg, 400);
		this.name = 'BucketAlreadyExists';
		this.code = BucketAlreadyExistsError.CODE;
		this.bucketId = bucketId;
	}
}
BucketAlreadyExistsError.CODE = 'ERROR_BUCKET_ALREADY_EXISTS';

/**
 * A bucket that is being deleted is not empty
 * @extends HTTPError
 * @property {string} bucketId
 */
export class BucketNotEmptyError extends HTTPError {
	constructor(bucketId, msg = `Bucket ${bucketId} is not empty`) {
		super(msg, 400);
		this.name = 'BucketNotEmpty';
		this.code = BucketNotEmptyError.CODE;
		this.bucketId = bucketId;
	}
}
BucketNotEmptyError.CODE = 'ERROR_BUCKET_NOT_EMPTY';

/* Block Errors */

export class BlockSizeInvalidError extends HTTPError {
	constructor(msg = "Block Size Invalid") {
		super(msg, 403);
		this.name = 'BlockSizeInvalid';
		this.code = BlockSizeInvalidError.CODE;
	}
}
BlockSizeInvalidError.CODE = 'ERROR_BLOCK_NOT_FOUND'

export class BlockNotFoundError extends HTTPError {
	constructor(msg = "Block not found") {
		super(msg, 404);
		this.name = 'BlockNotFound';
		this.code = BlockNotFoundError.CODE;
	}
}
BlockNotFoundError.CODE = 'ERROR_BLOCK_NOT_FOUND'

/* Access Errors */

/**
 * The authorization header is in the correct format for the requested resource, the token specified is valid, 
 * but the token is not authorized to access the requested resourcess
 */
export class AccessDeniedError extends HTTPError {
	constructor(msg = 'Provided token is unauthorized') {
		super(msg, 403);
		this.name = 'InvalidToken';
		this.code = AccessDeniedError.CODE;
	}
}
AccessDeniedError.CODE = 'ERROR_ACCESS_DENIED';

/* Firebase errors */

/**
 * When there's an issue internally in making a request to Firebase.
 */
export class FirebaseError extends HTTPError {
	// TODO: Less wimpier error message
	constructor(msg = 'Internal error in Firebase') {
		super(msg, 500);
		this.name = 'FirebaseError';
		this.code = FirebaseError.CODE;
	}
}
FirebaseError.CODE = 'ERROR_FIREBASE';

/**
 * When non-existent data is requested from Firestore
 */
export class FirestoreNotFoundError extends HTTPError {
	constructor(msg = 'Requested data not found in Firestore') {
		super(msg, 404);
		this.name = 'FirestoreNotFound';
		this.code = FirestoreNotFoundError.CODE;
	}
}
FirestoreNotFoundError.CODE = 'ERROR_FIRESTORE_NOT_FOUND';

/**
 * When a call to create data in Firestore fails
 */
export class FirestoreCreateError extends HTTPError {
	constructor(msg = 'Failed to create data in Firestore') {
		super(msg, 500);
		this.name = 'FirestoreCreateError';
		this.code = FirestoreCreateError.CODE;
	}
}
FirestoreCreateError.CODE = 'ERROR_FIRESTORE_CREATE';

/**	
 * When a call to delete data in Firestore fails
 */
export class FirestoreDeleteError extends HTTPError {
	constructor(msg = 'Failed to delete data in Firestore') {
		super(msg, 500);
		this.name = 'FirestoreDeleteError';
		this.code = FirestoreDeleteError.CODE;
	}
}
FirestoreDeleteError.CODE = 'ERROR_FIRESTORE_DELETE';

/**
 * When a call to update data in Firestore fails
 */
export class FirestoreUpdateError extends HTTPError {
	constructor(msg = 'Failed to update data in Firestore') {
		super(msg, 500);
		this.name = 'FirestoreUpdateError';
		this.code = FirestoreUpdateError.CODE;
	}
}