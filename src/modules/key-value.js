const core = require('@actions/core');

const getValueFromKey = async vault => {
  const readPath = core.getInput('PATH', { required: true });
  try {
    const { data } = await vault.read(readPath);
    Object.keys(data).forEach(key => {
      core.exportVariable(key, data[String(key)]);
    });
  } catch (err) {
    core.setFailed(err.message);
    throw err;
  }
};

module.exports = {
  getValueFromKey
};
