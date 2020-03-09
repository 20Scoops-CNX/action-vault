const core = require('@actions/core');
const fs = require('fs');
const homedir = require('os').homedir();

const sshUtils = require('../utils/ssh');

const setCommandFromSSH = async vault => {
  const readPath = core.getInput('PATH', { required: true });
  const command = core.getInput('COMMAND', { required: true });
  try {
    const contents = fs.readFileSync(`${homedir}/.ssh/id_rsa.pub`, 'utf8');
    const { data } = await vault.write(readPath, {
      public_key: contents
    });
    if (!process.env.JEST_WORKER_ID) {
      fs.writeFileSync(`${homedir}/.ssh/id_rsa-cert.pub`, data.signed_key);
    } else {
      fs.writeFileSync(`${__dirname}/../../test-cert.pub`, data.signed_key);
    }

    await sshUtils.sshCommand(command);
  } catch (err) {
    core.setFailed(err.message);
    throw err;
  }
};

module.exports = {
  setCommandFromSSH
};
