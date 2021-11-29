const paths = require('../../../paths');

/**
 * @typedef {import('plop').AddActionConfig} AddActionConfig
 */

module.exports = function routeActions({ serviceName }) {
  /** @type {Array<AddActionConfig>} */
  const actions = [
    {
      type: 'addMany',
      base: `${paths.pathPlopTemplates}/service`,
      destination: `${paths.src}/services/`,
      templateFiles: `${paths.pathPlopTemplates}/service/**`,
      stripExtensions: ['plop'],
      data: {
        serviceName,
      },
    },
  ];

  return actions;
};
