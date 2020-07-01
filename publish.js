var zipFolder = require('zip-folder');
var path = require('path');
var fs = require('fs');
var request = require('request');

// We are using your web app name in various places,
// so please change it here!!!
var myWebAppName = "kysymykset"; 

// These are for creating the zip file to upload. No need to change.
var rootFolder = path.resolve('.');
var zipPath = path.resolve(rootFolder, '../'+myWebAppName+'.zip');


// We are using Kudu to publish the created zip to Azure. 
// This is URL points to your application kudu zip publishing api. 
var kuduApi = 'https://'+myWebAppName+'.scm.azurewebsites.net/api/zip/site/wwwroot';

// You'll get the deployment password from your Web App at Azure portal.
// Go to App Service - Overview, then hit the button on top bar saying "Get publish profile"
// The resulting file contains publishProfile sections. Pick the 
// (usually first) section, where profile name contains "Web Deploy".
var userName = '$'+myWebAppName;

// Paste the key here to replace the xxxxxxx's!
var userPWD = 'S0pASGfkvy1Xl3sfXlJEcoTno99BSYMthPifbhMFAG1kulEbrMMBqrPhpP9P';

function uploadZip(callback) {
  fs.createReadStream(zipPath).pipe(request.put(kuduApi, {
    auth: {
      username: userName,
      password: userPWD,
      sendImmediately: true
    },
    headers: {
      "Content-Type": "applicaton/zip"
    }
  }))
  .on('response', function(resp){
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      fs.unlink(zipPath,(err) => {});
      callback(null);
    } else if (resp.statusCode >= 400) {
      callback(resp);
    }
  })
  .on('error', function(err) {
    callback(err)
  });
}

function publish(callback) {
  zipFolder(rootFolder, zipPath, function(err) {
    if (!err) {
      uploadZip(callback);
    } else {
      callback(err);
    }
  })
}

publish(function(err) {
  if (!err) {
    console.log(myWebAppName+' succesfully published!');
  } else {
    console.error('failed to publish '+myWebAppName, err);
  }
});