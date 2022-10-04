const execSync = require('child_process').execSync

const environment = "development"

const services = [
    {
        name: 'site-store-db',
        url: 'https://github.com/coda-platform/site-store-db'
    },
    {
        name: 'site-store-db-admin',
        url: 'https://github.com/coda-platform/site-store-db-admin'
    },
    {
        name: 'site-store-stub',
        url: 'https://github.com/coda-platform/site-store-stub'
    },
    {
        name: 'site-cache-db',
        url: 'https://github.com/coda-platform/site-cache-db'
    },
    {
        name: 'stats-api',
        url: 'https://github.com/coda-platform/stats-api'
    },
    {
        name: 'learning-api',
        url: 'https://github.com/coda-platform/learning-api'
    },
    {
        name: 'site-api',
        url: 'https://github.com/coda-platform/site-api'
    }
]

for (const service of services) {
    execSync(`git clone ${service.url} && ` +
        `cd ${service.name} && ` +
        `cp ../envs/${service.name}.env .env && ` +
        `cat ../.env >> .env && ` +
        `npm install && ` +
        `npm run caprover:setup && ` +
        `npm run caprover:deploy && ` +
        `cd .. && rm -rf ${service.name}`, { stdio: 'inherit' })
}