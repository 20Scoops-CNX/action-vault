const core = require('@actions/core');

const url = core.getInput('VAULT_HOST');
const token = core.getInput('VAULT_TOKEN');

/**
 * aws,kv,ssh
 */
const usageModule = core.getInput('MODULE');

const modules = require('./modules');

const options = {
  apiVersion: 'v1',
  endpoint: url,
  token: token
};

const vault = require('node-vault')(options);

modules(vault, usageModule);
