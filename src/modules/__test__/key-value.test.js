const core = require('@actions/core');
const vault = require('node-vault');
const { getValueFromKey } = require('../key-value');

describe('action test suite aws', () => {
  it('It should have variable from key', async done => {
    core.getInput = jest.fn().mockReturnValueOnce('my-secret/develop');
    vault.read = jest.fn(() =>
      Promise.resolve({
        request_id: 'a7debdca-bc0d-4dde-cf09-87c4fdb0f2a3',
        lease_id: '',
        renewable: false,
        lease_duration: 2764800,
        data: { host: '127.0.0.1', secrets: 'my-secret', host_user: 'ubuntu' },
        wrap_info: null,
        warnings: null,
        auth: null
      })
    );
    await getValueFromKey(vault);
    expect(process.env.host).toEqual('127.0.0.1');
    expect(process.env.secrets).toEqual('my-secret');
    expect(process.env.host_user).toEqual('ubuntu');
    done();
  });
  it('It should throw error when get wrong path', async done => {
    core.getInput = jest.fn().mockReturnValueOnce('my-secrets/creds');
    vault.read = jest.fn(
      path =>
        new Promise((resolve, reject) => {
          if (path === 'my-secret/develop') {
            resolve({ lease_id: '' });
          } else {
            reject(new Error('path is not valid'));
          }
        })
    );
    try {
      await getValueFromKey(vault);
    } catch (err) {
      expect(err.message).toEqual('path is not valid');
    }
    done();
  });
});
