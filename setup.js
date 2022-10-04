const execSync = require('child_process').execSync

const environment = "development"

const main = {
    rootUrl: "sandbox.coda-platform.com",
    services: [

    ]
}

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
        name: 'site-api',
        url: 'https://github.com/coda-platform/site-api'
    }
]

for (const service of services) {
    execSync(`git clone ${service.url}`)
}

// caprover api --configFile site-store-db-admin.config.json