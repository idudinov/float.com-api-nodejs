/* eslint-disable no-console */
import ApiClient from './index';
import * as Util from 'util';
import * as FS from 'fs';
import * as Path from 'path';

Util.inspect.defaultOptions.depth = 5;
Util.inspect.defaultOptions.colors = true;

if (!process.env.FLOAT_API_KEY) {
    console.error('ERROR: This test requires process.env.FLOAT_API_KEY to be set up. Please check whether you have .env file in your project root or CI/CD env var is properly set.');
    process.exit(1);
}

const Client = new ApiClient({
    token: process.env.FLOAT_API_KEY,
    userAgent: 'float.com-api package integration test (https://github.com/idudinov/float.com-api-nodejs.git)',
});

console.log('Created API Client with options: ', Client.options);

(async function () {
    const output = {
        listPeople: await (async function() {
            console.log('Fetching people...');
            const result = await Client.listPeople();
            console.log('listPeople result:', result);
            return result;
        })(),
    };

    const outputStr = JSON.stringify(output, null, 2);
    const path = Path.resolve(process.cwd(), 'temp/integration.test.json');
    const dir = Path.dirname(path);
    if (!FS.existsSync(dir)) {
        FS.mkdirSync(dir, { recursive: true });
    }

    FS.writeFileSync(path, outputStr);
    console.log('Finished. Output: ', path);
})();

