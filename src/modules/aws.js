const core = require('@actions/core');
const readPath = core.getInput('PATH');

const getAwsKey = vault => {
  vault
    .read(readPath)
    .then(data => {
      core.exportVariable('AWS_ACCESS_KEY', data.access_key);
      core.exportVariable('AWS_SECRET_KEY', data.secret_key);
    })
    .catch(err => core.error(`Error ${err}`));
};

module.exports = {
  getAwsKey
};
