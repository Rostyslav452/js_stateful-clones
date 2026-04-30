'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const tempState = structuredClone(state);

  for (const e of actions) {
    switch (e.type) {
      case 'addProperties':
        Object.assign(tempState, e.extraData);
        break;
      case 'removeProperties':
        for (const key of e.keysToRemove) {
          delete tempState[key];
        }
        break;
      case 'clear':
        Object.keys(tempState).forEach((key) => delete tempState[key]);
        break;
      default:
        throw new Error();
    }
    result.push({ ...tempState });
  }

  return result;
}

module.exports = transformStateWithClones;
