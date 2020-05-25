const { getTldByVendor } = require('./tlds')

const tldMatcher = (vendor, tld) => {
    const vendorTlds = getTldByVendor(vendor)

    return {
        'qs': vendorTlds['qs'],
        'searchUrl': vendorTlds['list'][tld] || vendorTlds['default']
    }
}

const options = {
    'type': 'vendor',
    'vendor': 'google',
    'tld': '',
    'qs': '',
    'ssl': null,
    'createAnchor': false
}

/**
 * @param keywords string|Array - This can be example like ['hello world'] or 'hello world'
 * @param options
 * @params {type} vendor | custom - This required to define search provider. Default value is vandor
 * @params {vendor} Default value is google. If you choose custom vendor, this should be a domain like https://www.example.com
 * @params {tld} This required to define default search engine by country tld
 * @params {qs} If you use custom search url, use this. For example: 'search?q='
 * @params {ssl} Create urls using https or http. Default value is true
 * @params {createAnchor} Create a tag using created url.
 */
const searchify = (keywords = '', args) => {

    args = args && Object.keys(args).length ? args : options

    let { type, vendor, tld, ssl, qs: defaultQs, createAnchor } = args

    if (ssl === null || ssl === undefined) {
        ssl = true
    }

    let protocol = (ssl ? 'https' : 'http') + `://`

    let searchBase = ''
    let queryString = ''

    // Should I use encodeURIComponent or encodeURI?
    // See: https://stackoverflow.com/a/4540785/3821823

    if (type !== 'custom') {
        const { searchUrl, qs } = tldMatcher(vendor, tld)

        searchBase = searchUrl
        queryString = qs

    } else {
        if (vendor.startsWith('http')) {
            vendor = vendor.replace(/^https?:\/\//,'')
        }

        searchBase = vendor
        queryString = defaultQs
    }

    let result;

    if (Array.isArray(keywords)) {

        let urls = []
        
        keywords.forEach(keyword => {
            let url;
            
            let searchKeyword = encodeURIComponent(keyword)
            
            if (createAnchor) {
                url = `<a href="${protocol}${searchBase}/${queryString}${searchKeyword}">${keyword}</a>`
            } else {
                url = `${protocol}${searchBase}/${queryString}${searchKeyword}`
            }

            urls.push(url)
        })

        result =  urls.length == 1 ? urls.join('') : urls
    } else {
        let searchKeyword = encodeURIComponent(keywords)

        if (createAnchor) {
            result = `<a href="${protocol}${searchBase}/${queryString}${searchKeyword}">${keywords}</a>`
        } else {
            result = `${protocol}${searchBase}/${queryString}${searchKeyword}`
        }
    }

    return result
}



module.exports = {
    tldMatcher,
    searchify
}