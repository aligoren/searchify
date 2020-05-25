const google = require('./tld-list/google')
const yandex = require('./tld-list/yandex')
const yahoo = require('./tld-list/yahoo')
const bing = require('./tld-list/bing')

const vendors = {
    'google': {
        'qs': 'search?q=',
        'default': 'www.google.com',
        'list': { ...google }
    },
    'yandex': {
        'qs': 'search/?text=',
        'default': 'www.yandex.com',
        'list': { ...yandex }
    },
    'yahoo': {
        'qs': 'search?fr2=sb-top-search&p=',
        'default': 'search.yahoo.com',
        'list': { ...yahoo }
    },
    'bing': {
        'qs': 'search?q=',
        'default': 'www.bing.com',
        'list': { ...bing }
    }
}

const getTldByVendor = (vendor) => {
    return vendors[vendor] || vendors['google']
}

module.exports = {
    getTldByVendor
}