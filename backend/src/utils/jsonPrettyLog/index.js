var beautify = require('json-beautify')
const colorize = require('json-colorizer')

const pretty = (object) =>
  colorize(beautify(object, null, 2, 80), {
    colors: {
      STRING_KEY: '#44A6E6',
      BRACE: 'white',
      BRACKET: 'white',
      COLON: 'white',
      COMMA: 'white',
      STRING_LITERAL: '#CE8349',
      NUMBER_LITERAL: '#AECEA8',
      BOOLEAN_LITERAL: '#2E6DB4',
      NULL_LITERAL: '#2E6DB4',
    },
  })

  module.exports = {
    pretty
  }


