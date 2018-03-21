# babel-plugin-transform-react-styled-components-qa

This plugin transforms assignment of component created using styled-components to give the `data-qa` attribute with the value equal to LHS identifier.

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