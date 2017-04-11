var pjson = require('./package.json')
import git from 'git-rev-sync'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const banner = `// topolis. See https://github.com/bjornharrtell/topolis
// Licenses:
// https://github.com/bjornharrtell/topolis/blob/master/LICENSE.txt
`

export default {
  entry: 'src/topolis.js',
  format: 'umd',
  moduleName: 'topolis',
  banner,
  plugins: [
    replace({
      npm_package_version: pjson.version,
      git_hash: git.short()
    }),
    resolve(),
    commonjs(),
    babel({
      presets: [['env', {
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'ie >= 11']
        }
      }]],
      plugins: [
        'external-helpers'
      ],
      babelrc: false
    }),
    uglify({
      output: {
        comments: (node, token) => token.line < 4
      }
    })
  ]
}
