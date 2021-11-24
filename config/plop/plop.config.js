const helpers = require('./helpers');

const componentGenerator = require('./generators/component/componentGenerator');
const moduleGenerator = require('./generators/module/moduleGenerator');
const routeGenerator = require('./generators/route/routeGenerator');
const storeGenerator = require('./generators/store/storeGenerator');

/**
 * @typedef {import('plop').NodePlopAPI} NodePlopAPI
 */

/**
 *
 * @param {NodePlopAPI} plop
 */
module.exports = function plopFn(plop) {
  // Here we register each helper function for Plop.
  Object.keys(helpers).forEach((key) => {
    plop.setHelper(key, helpers[key]);
  });

  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('module', moduleGenerator);
  plop.setGenerator('route', routeGenerator);
  plop.setGenerator('store', storeGenerator);
};
