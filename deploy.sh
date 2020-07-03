##################################################################################################################################
# Deployment
# ----------

echo Handling node.js deployment.

# 1. Select node version
selectNodeVersion

# 2. Install npm packages
if [ -e "$DEPLOYMENT_SOURCE./package.json" ]; then
  cd "$DEPLOYMENT_SOURCE"
  eval $NPM_CMD install --production
  exitWithMessageOnError "npm failed"
  cd - > /dev/null
fi

# 3. Run gulp tasks
if [ -e "$DEPLOYMENT_SOURCE./gulpfile.js" ]; then
  echo "Running gulp tasks"
  cd "$DEPLOYMENT_SOURCE"
  eval './node_modules/.bin/gulp'
  exitWithMessageOnError "gulp failed"
  cd - > /dev/null
fi

# 4. KuduSync
if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then
  "$KUDU_SYNC_CMD" -v 50 -f "$DEPLOYMENT_SOURCE" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh;node_modules;package.json;gulpfile.js;.gitignore;.htaccess"
  exitWithMessageOnError "Kudu Sync failed"
fi