cd backstopjs


echo "*********** Running installation and setup for BackstopJS ***********"
sh ./utils/installation_setup.sh


echo "*********** Creating backstopFiles for each scenario BackstopJS ***********"
node ./utils/createBackstopFiles.js


echo "*********** Running BackstopJS ***********"
cd ..

# Iterate over each directory in bitmaps_config
for dir in ./backstopjs/backstop_data/bitmaps_config/*; do
  if [ -d "$dir" ]; then
    # If a directory, replace backstop.json in backstopjs
    cp "$dir/backstop.json" ./backstopjs/backstop.json

    # Run backstop test
    cd backstopjs
    backstop test
    cd ..
  fi
done