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

async function runEndpoint(run: () => Promise<any>, name: string): Promise<any> {
    console.log('Starting running endpoint', name, '...');
    try {
        const res = await run();
        console.log('Succeeded', name);
        return res;
    } catch (err) {
        console.error('Error during run of', name, err.message);
        return {
            error: err.message,
        };
    }
}

(async function () {
    let outputStr: string;

    try {
        const output = {
            people: await runEndpoint(() => Client.getPeople(), 'getPeople'),
            projects: await runEndpoint(() => Client.getProjects(), 'getProjects'),
            tasks: await runEndpoint(() => Client.getTasks({ start_date: '2021-03-01', end_date: '2021-03-31' }), 'getTasks'),
        };

        outputStr = JSON.stringify(output, null, 2);
    } catch (err) {
        outputStr = `{ "error": ${JSON.stringify(err.message)} }`;
        console.error('Error during fetch:', err.message);
    }

    const path = Path.resolve(process.cwd(), 'temp/integration.test.json');
    saveResults(outputStr, path);
    console.log('Finished. Output: ', path);
})();

function saveResults(data: string, path: string) {
    const dir = Path.dirname(path);
    if (!FS.existsSync(dir)) {
        FS.mkdirSync(dir, { recursive: true });
    }

    FS.writeFileSync(path, data);
}
