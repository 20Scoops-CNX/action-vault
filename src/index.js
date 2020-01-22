const core = require('@actions/core');

/**
 * Vault host url path http://vault-server.com
 */
const url = core.getInput('VAULT_HOST', { required: true });

/**
 * Vault token s.HnKx12u6rYFFIRMotZ4kOExu
 */
const token = core.getInput('VAULT_TOKEN', { required: true });

/**
 * Vault module usage aws,kv,ssh
 */
const usageModule = core.getInput('MODULE', { required: true });

const modules = require('./modules');

const options = {
  apiVersion: 'v1',
  endpoint: url,
  token: token
};

const vault = require('node-vault')(options);

modules(vault, usageModule);
