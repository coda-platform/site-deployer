const execSync = require('child_process').execSync
const dotenv = require('dotenv')
dotenv.config()

const services = [
    {
        name: 'dicom-store',
        url: 'https://github.com/coda-platform/dicom-store'
    },
    {
        name: 'fhir-store-db',
        url: 'https://github.com/coda-platform/fhir-store-db'
    },
    {
        name: 'fhir-store-db-admin',
        url: 'https://github.com/coda-platform/fhir-store-db-admin'
    },
    {
        name: 'fhir-store',
        url: 'https://github.com/coda-platform/fhir-store'
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

execSync(`caprover logout -n ${process.env.CAPROVER_NAME} || true`)

for (const service of services) {
    execSync(
        `rm -rf ${service.name} 2> /dev/null || true && ` +
        `git clone ${service.url} && ` +
        `cd ${service.name} && ` +
        `cp ../envs/${service.name}.env .env && ` +
        `echo "\n" >> .env && ` +
        `cat ../.env >> .env && ` +
        `npm install && ` +
        `npm run caprover:setup && ` +
        `npm run caprover:deploy && ` +
        `cd .. && rm -rf ${service.name}`, { stdio: 'inherit' })
}