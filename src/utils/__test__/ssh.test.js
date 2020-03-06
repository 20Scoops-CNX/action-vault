// const Client = require('ssh2').Client;
const fs = require('fs');
// jest.genMockFromModule('ssh2');
// jest.mock(Client);

// const mockSsh2Client = jest.fn(function() {
//   this.connect = jest.fn();
//   this.end = jest.fn();
//   this.on = jest.fn();
// });
// Client.mockImplementation(() => mockSsh2Client);

// const sshUtils = require('../../utils/ssh');

describe('test utils suite ssh', () => {
  it('It should get signed key', async done => {
    // TODO: implement test
    // const command = 'pwd';
    // fs.readFileSync = jest.fn();
    // await sshUtils.sshCommand(command);
    // expect(mockSsh2Client.connect).toHaveBeenCalledTimes(1);
    // expect(mockSsh2Client.on).toHaveBeenCalledTimes(1);
    // expect(fs.readFileSync.mock.calls.length).toBe(2);
    done();
  });
});
