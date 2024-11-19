# ensures that we always use the latest version of the script
if [ -f build-site.sh ]; then
  rm build-site.sh
fi 
curl https://raw.githubusercontent.com/mongodb/docs-worker-pool/refs/heads/DOP-5189-403-sharedinclude/scripts/build-site.sh -o build-site.sh 
sh build-site.sh
