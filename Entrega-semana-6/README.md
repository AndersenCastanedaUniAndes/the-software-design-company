# DISCLAIMER
Algunas pruebas pueden fallar por condiciones inesperada e incompatibilidades de Ghost y del sistema operativo donde se ejecuten..


# Setup for Playwright and Resemble.js (e2e tests and VRT)
https://github.com/AndersenCastanedaUniAndes/the-software-design-company/blob/main/Entrega-semana-6/playwright/README.md

# Setup for Kraken and Resemble.js (e2e tests and VRT)
https://github.com/AndersenCastanedaUniAndes/the-software-design-company/blob/main/Entrega-semana-6/kraken/README.md

# Running Ghost version 5.69.0 and 4.48.9 with MySQL in Docker

Follow these steps to run Ghost version 5.69.0 and 4.48.9 with MySQL in Docker:

## Installation

### Step 1: Install Docker

#### For Mac:

1. Go to Docker's official website: https://www.docker.com/products/docker-desktop
2. Download the Docker Desktop installer for Mac.
3. Double-click Docker.dmg to open the installer, then drag the Docker icon to the Applications folder.
4. Open Docker Desktop from your Applications.

#### For Windows:

1. Go to Docker's official website: https://www.docker.com/products/docker-desktop
2. Download the Docker Desktop installer for Windows.
3. Run the installer and follow the instructions.
4. Open Docker Desktop from your Start menu.

In case you get WSL error message "Unexpected WSL error" opening Docker, follow the next steps:
1. Execute `wsl.exe --update` to upgrade WSL to version 2.
2. Restart your Windows machine.
3. Use this command `wsl -l -v` to check if you have Linux distributions installed with the version 2 of WSL.
4. If you have linux distributions installed with version 2 of WSL you're ready to start setup with docker.
5. If not, use this command `wsl -l -o` to check the list of the available linux distributions.
6. Install one of the listed distribution with this command `wsl --install -d <Distribution Name>`.
7. Now you would be ok to start with this setup.

#### For Linux:

1. Update your existing list of packages: `sudo apt-get update`
2. Install a few prerequisite packages which let apt use packages over HTTPS: `sudo apt-get install apt-transport-https ca-certificates curl software-properties-common`
3. Add the GPG key for the official Docker repository to your system: `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
4. Add the Docker repository to APT sources: `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`
5. Update the package database with the Docker packages from the newly added repo: `sudo apt-get update`
6. Make sure you are about to install from the Docker repo instead of the default Ubuntu repo: `apt-cache policy docker-ce`
7. Install Docker: `sudo apt-get install -y docker-ce`

### Step 2: Run Ghost with MySQL in Docker

Make sure to have a terminal opened in order to execute the next steps for ghost and docker

#### For Ghost 5.69.0:

1. Pull the Ghost image: `docker pull ghost:5.69.0`

2. Pull MySQL image from docker, use the specific step for you chip architecture:

    - arm64v8 (Mac M1) chipset image: `docker pull arm64v8/mysql`

    - x86 chipset image: `docker pull mysql:5.7`

3. Create a network: `docker network create ghost_network_5_69_0`

4. Run the MySQL container:

    - arm64v8 (Mac M1) container: `docker run --name mysql_ghost_569 --network=ghost_network_5_69_0 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ghost_569 -d arm64v8/mysql`

    - x86 container: `docker run --name mysql_ghost_569 --network=ghost_network_5_69_0 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ghost_569 -d mysql:5.7`

5. Run the Ghost container: `docker run --name ghost_container_569 --network=ghost_network_5_69_0 -p 3001:2368 -e database__client=mysql -e database__connection__host=mysql_ghost_569 -e database__connection__user=root -e database__connection__password=root -e database__connection__database=ghost_569 -d ghost:5.69.0`

#### For Ghost 4.48.9:

1. Pull the Ghost image: `docker pull ghost:4.48.9`

2. Pull MySQL image from docker, use the specific step for you chip architecture:

    - arm64v8 (Mac M1) chipset image: `docker pull arm64v8/mysql`

    - x86 chipset image: `docker pull mysql:5.7`

3. Create a network: `docker network create ghost_network_4_48_9`

4. Run the MySQL container: `docker run --name mysql_ghost_4489 --network=ghost_network_4_48_9 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ghost_4489 -d arm64v8/mysql`

5. Run the Ghost container: `docker run --name ghost_container_4489 --network=ghost_network_4_48_9 -p 3002:2368 -e database__client=mysql -e database__connection__host=mysql_ghost_4489 -e database__connection__user=root -e database__connection__password=root -e database__connection__database=ghost_4489 -d ghost:4.48.9`

The Ghost applications will be accessible at http://localhost:3001ghost/#/signin and http://localhost:3002ghost/#/signin respectively.

***REMEMBER TO CREATE THE SAME ADMINISTRATOR ACCOUNT FOR EACH APPLICATION***

## Next steps
Please follow the steps:
* [Regression Visual Testing with Kraken](./kraken/README.md) 
* [Regression Visual Testing with Playwright](./kraken/README.md) 



## Authors

- Cristian Camilo Pinzon Hernandez
- Juan Carlos De Jesus
- Alex Santiago Meneses Sanchez
- Andersen Castañeda
