const core = require('@actions/core');
const fs = require('fs');
const vault = require('node-vault');

const { setCommandFromSSH } = require('../ssh');
const sshUtils = require('../../utils/ssh');

describe('action test suite aws', () => {
  it('It should get write signed key correctly', async done => {
    core.getInput = jest
      .fn()
      .mockReturnValueOnce('my-ssh/sign/user')
      .mockReturnValueOnce('pwd');
    const resultObject = {
      request_id: 'fc909dd7-9bde-e759-cffa-ad1f99efe7ee',
      lease_id: '',
      renewable: false,
      lease_duration: 0,
      data: {
        serial_number: 'f24a47e9deea75dc',
        signed_key:
          'ssh-rsa-cert-v01@openssh.com AAAAHHNzaC1yc2...2M8hLFujZ/ym0je8NC8gI9XC\n'
      },
      wrap_info: null,
      warnings: null,
      auth: null
    };
    vault.write = jest.fn(() => Promise.resolve(resultObject));
    sshUtils.sshCommand = jest.fn();
    await setCommandFromSSH(vault);
    expect(sshUtils.sshCommand.mock.calls.length).toBe(1);
    expect(resultObject.data.signed_key).toEqual(
      fs.readFileSync(`${__dirname}/../../../test-cert.pub`, 'utf8')
    );
    done();
  });
});
