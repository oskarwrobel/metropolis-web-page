'use strict';

var plan = require('flightplan');
var path = require('path');
var config = require('./config/deploy');

'/var/www/metropolis/'

var appPath = '/var/www/joannalawniczak.com';
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
    local.exec('gulp');

    local.log('Copy files to remote host');
    var filesToCopy = local.exec('(git ls-files -z;find public/dist -type f -print0)', {silent: true});
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

plan.remote('deploy', function(remote) {
    remote.log('Move folder to web root');
    remote.mkdir('-p ' + appPath);
    remote.cp('-R ' + path.join('/tmp/', tmpDir, ' ', appPath, tmpDirName));
    remote.rm('-rf ' + path.join('/tmp/', tmpDir));

    remote.log('Install dependencies');
    remote.exec('npm install --production  --prefix ' + path.join(appPath, tmpDirName));

    remote.log('Reload application');
    remote.ln('-sfn ' + path.join(appPath, tmpDirName, ' ', appPath, 'current'));
    remote.exec('forever stop ' + appPath + serverFile, {failsafe: true});
    remote.exec('NODE_ENV=production forever start ' + appPath + serverFile);

    remote.log('Remove old version');
    remote.find(appPath + ' -maxdepth 1 | tail -n +2 | sort -r | tail -n +4 | xargs rm -rf');
});
