const core = require('@actions/core');
const aws = require('./aws');
const keyValue = require('./key-value');

module.exports = async (vault, usageModule) => {
  switch (usageModule) {
    case 'aws':
      await aws.getAwsKey(vault);
      break;
    case 'kv':
      await keyValue.getValueFromKey(vault);
      break;
    case 'ssh':
      core.warning('Feature is not available.');
      break;
    default:
      core.setFailed('Module variable is invalid');
      throw new Error('Module variable is invalid');
  }
};
