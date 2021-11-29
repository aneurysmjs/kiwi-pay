const paths = require('../../../paths');

/**
 * @typedef {import('plop').AddActionConfig} AddActionConfig
 */

module.exports = function routeActions({ moduleName }) {
  /** @type {Array<AddActionConfig>} */
  const actions = [
    {
      type: 'addMany',
      base: `${paths.pathPlopTemplates}/module`,
      destination: `${paths.src}/modules`,
      templateFiles: `${paths.pathPlopTemplates}/module/**`,
      stripExtensions: ['plop'],
      data: {
        moduleName,
      },
    },
    {
      type: 'addMany',
      base: `${paths.pathPlopTemplates}/store`,
      destination: `${paths.src}/store/modules/{{camelCase moduleName}}`,
      templateFiles: `${paths.pathPlopTemplates}/store/**`,
      stripExtensions: ['plop'],
      data: {
        storeName: moduleName,
      },
    },
  ];

  return actions;
};
