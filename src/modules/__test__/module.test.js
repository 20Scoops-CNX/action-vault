const core = require('@actions/core');
const main = require('../../test/main');

describe('module selection test', () => {
  it('It should throw error with invalid module', async done => {
    core.getInput = jest
      .fn()
      .mockReturnValueOnce('http://vault-server.com')
      .mockReturnValueOnce('s.MocCkVaultTOken')
      .mockReturnValueOnce('creds')
      .mockReturnValueOnce('aws-test/creds');
    try {
      await main();
    } catch (err) {
      expect(err.message).toEqual('Module variable is invalid');
    }
    done();
  });

  it('It should call none implement module kv warning', async done => {
    const mockFunction = jest
      .fn()
      .mockReturnValueOnce('http://vault-server.com')
      .mockReturnValueOnce('s.MocCkVaultTOken')
      .mockReturnValueOnce('kv')
      .mockReturnValueOnce('aws-test/creds');
    core.getInput = mockFunction;
    core.warning = jest.fn();
    const main = require('../../test/main');
    await main();
    expect(core.warning.mock.calls.length).toBe(1);
    done();
  });

  it('It should call none implement module ssh warning', async done => {
    core.getInput = jest
      .fn()
      .mockReturnValueOnce('http://vault-server.com')
      .mockReturnValueOnce('s.MocCkVaultTOken')
      .mockReturnValueOnce('ssh')
      .mockReturnValueOnce('aws-test/creds');
    core.warning = jest.fn();
    const main = require('../../test/main');
    await main();
    expect(core.warning.mock.calls.length).toBe(1);
    done();
  });
});
