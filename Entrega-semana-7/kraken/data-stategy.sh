#!/bin/bash

echo "Please select the type of data strategy:"
echo "1. Escenario aleatorio"
echo "2. Pool de datos a-priori"
echo "3. Pool de datos (pseudo) aleatorio dinámico"
read -p "Enter your choice (1-3): " choice

case $choice in
  1)
    src_dir="./aleatorio"
    ;;
  2)
    src_dir="./a_priori"
    ;;
  3)
    src_dir="./pseudo_aleatorio_dinamico"
    ;;
  *)
    echo "Invalid choice"
    exit 1
    ;;
esac


echo "moving features files from $src_dir please wait"

dest_dir="./features"

# Move .feature files to features directory
mv "$src_dir"/*.feature "$dest_dir"

# Run npx kraken-node run
echo "*********** Running kraken ***********"
# # Execute the command
if [[ "$(uname)" == "Darwin" ]]; then
    npx kraken-node run
  else
    sh ./utils/run-kraken-windows.sh
  fi


# Move .feature files back to their original directory
mv "$dest_dir"/*.feature "$src_dir"

echo "moving features files back to their original directory"