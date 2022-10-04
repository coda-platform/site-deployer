const axios = require('axios')

const environment = "development"

const main = {
    rootUrl: "sandbox.coda-platform.com",
    services: [

    ]
}

const sites = [
    {
        name: "site1",
        rootUrl: "site1-sandbox.coda-platform.com",

        services: [
            {
                name: 'site-store', url: 'https://site-store.site1-sandbox.coda-platform.com', test: (data) => {
                    return data.includes('aidbox')
                }
            },
            {
                name: 'learning-api', url: 'https://learning-api.site1-sandbox.coda-platform.com', test: (data) => {
                    return data.status === 'connected'
                }
            },
            {
                name: 'site-api', url: 'https://site-api.site1-sandbox.coda-platform.com', test: (data) => {
                    return data.status === 'connected'
                }
            },
            {
                name: 'site-store-db-admin', url: 'https://site-store-db-admin.site1-sandbox.coda-platform.com', test: (data) => {
                    return data.meta.code === 200
                },
                env: {
                    'PGADMIN_DEFAULT_EMAIL': 'unsafe@unsafe.com',
                    'PGADMIN_DEFAULT_PASSWORD': 'unsafeunsafe'
                },
                config: {
                    enableHTTPS: true,
                    forceHTTPS: true
                }
            }
        ]
    }
]

// caprover api --configFile site-store-db-admin.config.json

async function runTests() {

    for (const site of sites) {

        for (const service of site.services) {

            const { name, url, test } = service

            try {
                const response = await axios.get(url)

                if (test) {
                    const result = test(response.data)
                    console.log(url, result)
                } else {
                    console.log(url, true)
                }
            } catch (e) {
                console.log('Failed', url)
            }

            //

        }

    }

}

runTests()