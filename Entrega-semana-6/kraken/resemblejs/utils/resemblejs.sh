# Navigate to the directory where the package.json file is located
cd ./resemblejs

# Install npm dependencies
npm install

# Go back to kraken root folder
cd ..

# Run the index.js file located in the resemblejs folder

node ./resemblejs/index.js

# For each folder in the /resemblejs/results/comparison directory, open the report.html file in a browser
for dir in ./resemblejs/results/comparison/*
do
  echo "Please open the following report manually: $dir/report.html"
done