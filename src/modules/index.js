const core = require('@actions/core');
const aws = require('./aws');

module.exports = (vault, usageModule) => {
  switch (usageModule) {
    case 'aws':
      aws.getAwsKey();
      break;
    case 'kv':
      core.warning('Feature is not available.');
      break;
    case 'ssh':
      core.warning('Feature is not available.');
      break;
    default:
      core.error('Function is invalid');
      break;
  }
};
