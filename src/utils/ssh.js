const Client = require('ssh2').Client;
const fs = require('fs');
const homedir = require('os').homedir();

const sshCommand = ({ command, ipAddress, port, username }) => {
  const ppk = fs.readFileSync(`${homedir}/.ssh/id_rsa`);
  const pub = fs.readFileSync(`${homedir}/.ssh/id_rsa-cert.pub`);
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on('ready', function() {
        conn.shell(function(err, stream) {
          if (err) reject(err);
          stream
            .on('close', function() {
              conn.end();
              resolve(true);
            })
            .on('data', function(data) {
              console.log(String(data));
            });
          stream.end(`${command} \nexit\n`);
        });
      })
      .connect({
        host: ipAddress,
        port,
        username,
        privateKey: ppk,
        publicKey: pub,
        tryKeyboard: true
      });
  });
};

module.exports = {
  sshCommand
};
