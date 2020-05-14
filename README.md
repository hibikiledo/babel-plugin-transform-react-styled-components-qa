# babel-plugin-transform-react-styled-components-qa

This plugin adds `data-qa` props to styled-component using `.attrs`.

This plugin can be used with [babel-plugin-transform-react-qa-classes](https://github.com/davesnx/babel-plugin-transform-react-qa-classes) to provide support for both styled-components and React components.

### Standard HTML Tags
In
```js
const Component = styled.p`
    color: red;
`
```
Out
```js
const Component = styled.p.attrs({
    "data-qa": "Component"
})`
    color: red;
`
```

### Computed Property is also supported
In
```js
const tagName = 'h1'
const Component = styled[tagName]`
    background: 'pink';
`
```
Out
```js
const tagName = 'h1'
const Component = styled[tagName].attrs({
    "data-qa": "Component"
})`
    background: 'pink';
`
```

### `data-qa` is append after other attributes defined by users
In
```js
const PasswordInput = styled.input.attrs({
    type: 'password'
})`
    font-size: 14px;
    line-height: 2em;
`
```
Out
```js
const PasswordInput = styled.input.attrs({
    type: 'password',
    "data-qa": "PasswordInput"
})`
    font-size: 14px;
    line-height: 2em;
`
```

## Usage

This plugin is intended to be use in pre-production environment. \
Using this plugin with SSR could result in larger payload due to the extra attribute.

#### .babelrc
```
{
    "env": {
        "dev": {
            plugins: [
                ["transform-react-styled-components-qa", {
                    "attribute": "data-qa",
                    "format": "kebab"
                }]
            ]
        }
    }
}
```

## Options
#### attribute : (string)
The attribute name to be used instead of `data-qa`.
#### format : (string)
**Support values:** `kebab`, `camel`, `snake`, `pascal` \
**Default value:** `kebab`