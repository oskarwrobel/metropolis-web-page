'use strict';

var plan = require('flightplan');
var path = require('path');

var appPath = '/var/www/metropolis';
var appDirName = appPath.split('/').pop();
var tmpDirName = +new Date() + '/';
var tmpDir = appDirName + '-' + tmpDirName;

plan.target('production', [{
    host: 'oskarwrobel.pl',
    port: 14444,
    username: 'wrb',
    agent: process.env.SSH_AUTH_SOCK
}]);

plan.local('deploy', function(local) {
    local.log('Run build');
    local.exec('npm install');
    local.exec('bower install');
    local.exec('gulp');

    local.log('Copy files to remote host');
    var filesToCopy = local.exec('(find dist -type f -print0)', {silent: true});
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

plan.remote('deploy', function(remote) {
    remote.log('Create app root directory if not exists');
    remote.mkdir('-p ' + appPath);

    remote.log('Clear previous version');
    remote.rm('-rf ' + path.join(appPath, '*'));

    remote.log('Move folder to web root');
    remote.mkdir('-p ' + path.join(appPath, 'projects', 'metropolis'));
    remote.cp('-r ' + path.join('/tmp/', tmpDir, 'dist/* ', appPath, 'projects', 'metropolis/'));
    remote.rm('-rf ' + path.join('/tmp/', tmpDir));
});
