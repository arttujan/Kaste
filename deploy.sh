# Deployment  
# ----------  

echo Handling node.js gulp deployment.  

# 1. Select node version  
selectNodeVersion  

# 2. Install npm packages  
if [ -e "$DEPLOYMENT_SOURCE./package.json" ]; then  
  eval $NPM_CMD install  
  exitWithMessageOnError "npm failed"  
fi  

# 3. Install bower packages  
if [ -e "$DEPLOYMENT_SOURCE./bower.json" ]; then  
  eval $NPM_CMD install bower  
  exitWithMessageOnError "installing bower failed"  
  ./node_modules/.bin/bower install  
  exitWithMessageOnError "bower failed"  
fi  

# 4. Run gulp for build
if [ -e "$DEPLOYMENT_SOURCE./gulpfile.js" ]; then  
  eval $NPM_CMD install gulp 
  exitWithMessageOnError "installing gulpfailed"  
  ./node_modules/.bin/gulp serve
  exitWithMessageOnError "gulp failed"  
fi  

# 5. KuduSync to Target  
"$KUDU_SYNC_CMD" -v 500 -f "$DEPLOYMENT_SOURCE/dist" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh"  
exitWithMessageOnError "Kudu Sync to Target failed"