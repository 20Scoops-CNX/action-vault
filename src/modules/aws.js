const core = require('@actions/core');

const getAwsKey = async vault => {
  const readPath = core.getInput('PATH', { required: true });
  try {
    const credential = await vault.read(readPath);
    core.exportVariable('AWS_ACCESS_KEY', credential.data.access_key);
    core.exportVariable('AWS_SECRET_KEY', credential.data.secret_key);
  } catch (err) {
    core.setFailed(err.message);
    throw err;
  }
};

module.exports = {
  getAwsKey
};
