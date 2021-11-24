const paths = require('../../../paths');

/**
 * @typedef {import('plop').AddActionConfig} AddActionConfig
 */
module.exports = function routeActions({ storeName }) {
  /** @type {Array<AddActionConfig>} */
  const actions = [
    {
      type: 'addMany',
      base: `${paths.pathPlopTemplates}/store`,
      destination: `${paths.src}/store/{{properCase storeName}}`,
      templateFiles: `${paths.pathPlopTemplates}/store/**`,
      stripExtensions: ['plop'],
      data: {
        storeName,
      },
    },
  ];

  return actions;
};
