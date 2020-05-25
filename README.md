# Searchify

A very simple searchable link generator.

## Usage

You can use searchify with pre-defined search engines or custom.

### Vendors

- google
- yandex
- yahoo
- bing

## Params

You can configure URLs by options

**keywords**

Type: `string|Array`

**options?**

Type: `object`

```json
{
    'type': 'vendor', // vendor | custom
    'vendor': 'google', // this works when type is vendor
    'tld': '', // by default, each url will be generated with .com domain
    'qs': '', // query string endpoint for custom URLs
    'ssl': null, // by default, protocols will be https. true | false
    'createAnchor': false // output will be an anchor tag
}
```

## Usage

### searchify(keyword, options?)

Using Google

```js
const keyword = 'Who is John Doe?'

const url = searchify(keyword, {
    'type': 'vendor',
    'vendor': 'google',
})
```

Using Yandex

```js
const keyword = 'Who is John Doe?'

const url = searchify(keyword, {
    'type': 'vendor',
    'vendor': 'yandex',
})
```

Using multiple keywords

```js
const keywords = [
    'Who is John Doe?',
    'Who is Jane Doe?'
]

const url = searchify(keywords, {
    'type': 'vendor',
    'vendor': 'google',
    'tld': 'tr'
})
```

Custom URLs

**Example 1:**

```js
const keyword = 'NestJS'

const url = searchify(keyword, {
    'type': 'custom',
    'vendor': 'https://aligoren.com',
    'qs': '?s=',
})
```

**Example 2:**

```js
const keyword = 'NestJS'

const url = searchify(keyword, {
    'type': 'custom',
    'vendor': 'https://stackoverflow.com',
    'qs': 'search?q=',
})
```

## Tests

This project is using `jest`

```bash
npm run test
```