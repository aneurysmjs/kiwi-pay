const paths = require('../../../paths');

/**
 * @typedef {import('plop').AddActionConfig} AddActionConfig
 */

module.exports = function routeActions({ routeName }) {
  /** @type {Array<AddActionConfig>} */
  const actions = [
    {
      type: 'addMany',
      base: `${paths.pathPlopTemplates}/route`,
      destination: `${paths.src}/routes/{{properCase routeName}}`,
      templateFiles: `${paths.pathPlopTemplates}/route/**`,
      stripExtensions: ['plop'],
      data: {
        routeName,
      },
    },
  ];

  return actions;
};
