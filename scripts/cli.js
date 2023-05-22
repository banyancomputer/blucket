#!/usr/bin/env node
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
import sade from 'sade';

// import { buildCmd } from './build.js';
// import { deployCmd } from './deploy.js';
// import { destroyCmd } from './destroy.js';
// import { devCmd } from './dev.js';
import { importFirebaseCmd } from './import-firebase.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// dotenv.config({
// 	path: path.join(__dirname, '..', '.env'),
// });

const prog = sade('blucket-api');

// Import Firebase configuration into the configruation of the api worker.
prog
	.command('import-firebase')
	.describe('Import a firebase service account.')
	.option('--env', 'Environment', 'dev') 
	.option('--force', 'Force import', false)
	.action(importFirebaseCmd);

prog
    .command('deploy')
	.describe('Deploy the worker.')
	.option('--env', 'Environment', process.env.ENV)
	.action(deployCmd);

prog.parse(process.argv);
