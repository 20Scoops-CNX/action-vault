const core = require('@actions/core');
const vault = require('node-vault');
const { getAwsKey } = require('../aws');

describe('action test suite aws', () => {
  it('It should have variable from env access key and secret key', async done => {
    core.getInput = jest.fn().mockReturnValueOnce('aws/creds/ecr');
    vault.read = jest.fn(() =>
      Promise.resolve({
        request_id: '52ddf6ff-012b-1e2f-8770-15087a94d2ca',
        lease_id: 'aws/creds/ecr/NZODhd5fHuoewXfFeWU0yOgk',
        renewable: true,
        lease_duration: 2764800,
        data: {
          access_key: 'AKIAXK23C3RT2VZXCVBN',
          secret_key: 'XXXCCCVBNubzEQtUeIAKfREv4axGpPEWSdsdQWQA1',
          security_token: null
        },
        wrap_info: null,
        warnings: null,
        auth: null
      })
    );
    await getAwsKey(vault);
    expect(process.env.AWS_ACCESS_KEY).toEqual('AKIAXK23C3RT2VZXCVBN');
    expect(process.env.AWS_SECRET_KEY).toEqual(
      'XXXCCCVBNubzEQtUeIAKfREv4axGpPEWSdsdQWQA1'
    );
    done();
  });

  it('It should throw error when get wrong path', async done => {
    core.getInput = jest.fn().mockReturnValueOnce('aws/creds');
    vault.read = jest.fn(
      path =>
        new Promise((resolve, reject) => {
          if (path === 'aws/creds/ecr') {
            resolve({ lease_id: 'aws/creds/ecr/NZODhd5fHuoewXfFeWU0yOgk' });
          } else {
            reject(new Error('path is not valid'));
          }
        })
    );
    try {
      await getAwsKey(vault);
    } catch (err) {
      expect(err.message).toEqual('path is not valid');
    }
    done();
  });
});
