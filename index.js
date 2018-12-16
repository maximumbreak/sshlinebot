var path, node_ssh, ssh, fs

fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')
ssh = new node_ssh()

ssh
  .connect({
    host: 'ec2-54-255-209-52.ap-southeast-1.compute.amazonaws.com',
    username: 'ec2-user',
    privateKey: 'aws-firstnaruto.pem'
  })
  .then((result, error) => {
    ssh.execCommand('cd /home', { cwd: '/var/www' }).then(function(result) {
      console.log('STDOUT: ' + result.stdout)
      console.log('STDERR: ' + result.stderr)
    })
  })
