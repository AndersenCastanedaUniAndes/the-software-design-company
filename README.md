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

#### For Linux:

1. Update your existing list of packages: `sudo apt-get update`
2. Install a few prerequisite packages which let apt use packages over HTTPS: `sudo apt-get install apt-transport-https ca-certificates curl software-properties-common`
3. Add the GPG key for the official Docker repository to your system: `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
4. Add the Docker repository to APT sources: `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`
5. Update the package database with the Docker packages from the newly added repo: `sudo apt-get update`
6. Make sure you are about to install from the Docker repo instead of the default Ubuntu repo: `apt-cache policy docker-ce`
7. Install Docker: `sudo apt-get install -y docker-ce`

### Step 2: Run Ghost with MySQL in Docker

#### For Ghost 5.69.0:

1. Pull the Ghost image: `docker pull ghost:5.69.0`

2. Pull MySQL image from docker, use the specific step for you chip architecture:

    - amd64v8 (Mac M1) chipset image: `docker pull amd64v8/mysql`

    - x86 chipset image: `docker pull mysql:5.7`

3. Create a network: `docker network create ghost_network_5_69_0`

4. Run the MySQL container:

    - amd64v8 (Mac M1) container: `docker run --name mysql_ghost_569 --network=ghost_network_5_69_0 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ghost_569 -d amd64v8/mysql`

    - x86 container: `docker run --name mysql_ghost_569 --network=ghost_network_5_69_0 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ghost_569 -d mysql:5.7`

5. Run the Ghost container: `docker run --name ghost_container_569 --network=ghost_network_5_69_0 -p 3001:2368 -e database__client=mysql -e database__connection__host=mysql_ghost_569 -e database__connection__user=root -e database__connection__password=root -e database__connection__database=ghost_569 -d ghost:5.69.0`

#### For Ghost 4.48.9:

1. Pull the Ghost image: `docker pull ghost:4.48.9`
2. Pull the MySQL image: `docker pull mysql:5.7`
3. Create a network: `docker network create ghost_network_4_48_9`
4. Run the MySQL container: `docker run --name mysql_ghost_4489 --network=ghost_network_4_48_9 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ghost_4489 -d mysql:5.7`
5. Run the Ghost container: `docker run --name ghost_container_4489 --network=ghost_network_4_48_9 -p 3002:2368 -e database__client=mysql -e database__connection__host=mysql_ghost_4489 -e database__connection__user=root -e database__connection__password=root -e database__connection__database=ghost_4489 -d ghost:4.48.9`

The Ghost applications will be accessible at http://localhost:3001 and http://localhost:3002 respectively.

## Authors

- Cristian Camilo Pinzon Hernandez
- Juan Carlos De Jesus
- Alex Santiago Meneses Sanchez
- Andersen Castañeda
