const { tldMatcher, searchify } = require('../src/searchify')

describe('Tests for Vendors', () => {

    test(`VENDOR: default vendor should be returned if tld never existed`, () => {
        expect(tldMatcher().searchUrl).toBe('www.google.com')
    })

    test('GOOGLE: tld should be match', () => {
        expect(tldMatcher('google', 'tr').searchUrl).toBe('www.google.com.tr')
    })
    
    test(`GOOGLE: default url should be returned if tld didn't passed`, () => {
        expect(tldMatcher('google').searchUrl).toBe('www.google.com')
    })
    
    test(`GOOGLE: default url should be returned if tld never existed`, () => {
        expect(tldMatcher('google', 'noname').searchUrl).toBe('www.google.com')
    })

    test(`Array Check for multipel URLs`, () => {

        const keywords = [
            'Project Idea 04 – Shopping List Web Application',
            'Project Idea 03 – Write a Trello Library'
        ]

        const url = searchify(keywords, {
            'type': 'vendor',
            'vendor': 'google',
        })
        
        expect(Array.isArray(url)).toBe(true)
    })

    test(`GOOGLE: url should be Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application `, () => {

        const keyword = 'Project Idea 04 – Shopping List Web Application'

        const url = searchify(keyword, {
            'type': 'vendor',
            'vendor': 'google',
        })
        
        expect(url).toBe('https://www.google.com/search?q=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application')
    })

    test(`GOOGLE: tld url should be https://www.google.com.tr/search?q=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application `, () => {

        const keyword = 'Project Idea 04 – Shopping List Web Application'

        const url = searchify(keyword, {
            'type': 'vendor',
            'vendor': 'google',
            'tld': 'tr'
        })
        
        expect(url).toBe('https://www.google.com.tr/search?q=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application')
    })

    test(`YANDEX: tld url should be https://www.yandex.com.tr/search/?text=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application `, () => {

        const keyword = 'Project Idea 04 – Shopping List Web Application'

        const url = searchify(keyword, {
            'type': 'vendor',
            'vendor': 'yandex',
            'tld': 'tr'
        })
        
        expect(url).toBe('https://www.yandex.com.tr/search/?text=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application')
    })
    
    test(`YAHOO: tld url should be https://de.search.yahoo.com/search?fr2=sb-top-search&p=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application `, () => {

        const keyword = 'Project Idea 04 – Shopping List Web Application'

        const url = searchify(keyword, {
            'type': 'vendor',
            'vendor': 'yahoo',
            'tld': 'de'
        })
        
        expect(url).toBe('https://de.search.yahoo.com/search?fr2=sb-top-search&p=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application')
    })
    
    test(`BING: tld url should be https://www.bing.com/search?q=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application `, () => {

        const keyword = 'Project Idea 04 – Shopping List Web Application'

        const url = searchify(keyword, {
            'type': 'vendor',
            'vendor': 'bing',
        })
        
        expect(url).toBe('https://www.bing.com/search?q=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application')
    })
});

describe(`Tests for Custom URLs`, () => {
    test(`CUSTOM Domain 1: tld url should be https://aligoren.com/?s=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application `, () => {

        const keyword = 'Project Idea 04 – Shopping List Web Application'

        const url = searchify(keyword, {
            'type': 'custom',
            'vendor': 'https://aligoren.com',
            'qs': '?s=',
        })
        
        expect(url).toBe('https://aligoren.com/?s=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application')
    })

    test(`CUSTOM Domain 2: tld url should be https://stackoverflow.com/search?q=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application `, () => {

        const keyword = 'Project Idea 04 – Shopping List Web Application'

        const url = searchify(keyword, {
            'type': 'custom',
            'vendor': 'https://stackoverflow.com',
            'qs': 'search?q=',
        })
        
        expect(url).toBe('https://stackoverflow.com/search?q=Project%20Idea%2004%20%E2%80%93%20Shopping%20List%20Web%20Application')
    })
})