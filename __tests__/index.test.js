import * as babel from 'babel-core'
import path from 'path'

import plugin from '../src/index'

it('works', () => {
  const { code } = babel.transformFileSync(path.join(__dirname, 'code'), {
    plugins: [plugin]
  })
  expect(code).toMatchSnapshot()
})
