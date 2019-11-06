module.exports = (api) => {
  api.cache(true)

  return {
    'presets': [
      [
        'next/babel',
        {
          'styled-jsx': {
            'plugins': ['styled-jsx-plugin-stylus']
          }
        }
      ]
    ],
    'plugins': [
      'transform-react-pug',
      '@babel/transform-react-jsx',
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': true }]
    ],
    exclude: [],
    // ignore: [/node_modules\/(?!.*d3.*)/],
  }
}
