# Kraken-ghost

Kraken application that will execute E2E cases in the application ghost.

## Installation

This guide will help you install Node.js v16.14.2 and Android Studio on Mac, Linux, or Windows.

### Node.js Installation

#### Mac and Linux

You can use the Node Version Manager (nvm) to manage and install different versions of Node.js. To install nvm, you can use the install script using cURL:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Once nvm is installed, you can install Node.js v16.14.2 by running:

```bash
nvm install 16.14.2
```

#### Windows

For Windows, you can download the Node.js v16.14.2 installer directly from the official Node.js website:

[Node.js v16.14.2 Download](https://nodejs.org/dist/v16.14.2/)

After downloading, run the installer and follow the prompts to install Node.js.

### Android Studio Installation

You can download Android Studio from the official Android website:

[Android Studio Download](https://developer.android.com/studio)

After downloading, run the installer and follow the prompts to install Android Studio.

#### Setting Environment Variables

After installing Android Studio, you need to set the following environment variables:

- Android SDK Platform-Tools
- Android SDK Build-Tools
- Android SDK Tools (Obsolete)

The exact process for setting these variables depends on your operating system.

##### Mac and Linux

You can add these lines to your `~/.bashrc` or `~/.zshrc` file:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/build-tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Then, source your `~/.bashrc` or `~/.zshrc` file:

```bash
source ~/.bashrc
# or
source ~/.zshrc
```

##### Windows

On Windows, you can set environment variables through the "Environment Variables" button on the "Advanced" tab of the "System" control panel. Some versions of Windows provide this control panel through the "Advanced System Settings" option inside the "System" control panel.

```

Please note that the installation process may require administrative privileges.
```

### Kraken Installation

For here make sure that your are located in the folder `...\Entrega-semana-5\kraken`.

In order to install Kraken open a terminal an execute the following command:

```bash
npm install
npm install kraken-node -g
npm install -g appium
```

Make sure to update the `properties.json` file with your specific configurations. You can find this file at root level.

## Usage

To run kraken with the tests just execute the following command:

```bash
npx kraken-node run
```
## Visual Regression Testing with ResembleJS

Just run the bash file `kraken-resemblejs.sh` remember to give the sh enough priviligies

```bash
./kraken-resemblejs.sh
```
### steps

0. if you already run any of the shells before you will be ask to run te configuration.

1. This file will ask you to select a version of ghost (by default there are 2 versions `4.48.9` and `5.69.0`). **NOTE:** remember to follow the steps to run ghost in docker explained here [README for running ghost in docker](../README.md).

2. After selecting a version, you will be ask to enter the email, password and url for the ghost version introduced above.

3. Then, the `sh` will execute Kraken and will generate screenshots of the tests those can be found in VRT folder.

4. steps 1, 2 and 3 will be done again. In this case, you have to choose the other version of ghost. 

5.  ResembleJS will be executed and the result of the `sh` will give the path of the reports to be checked by you on any browser of your preference.


## Visual Regression Testing with BackstopJS

Just run the bash file `kraken-backstopjs.sh` remember to give the sh enough priviligies

```bash
./kraken-resemblejs.sh
```
### steps

0. if you already run any of the shells before you will be ask to run te configuration.

1. This file will ask you to select a version of ghost (by default there are 2 versions `4.48.9` and `5.69.0`). **NOTE:** remember to follow the steps to run ghost in docker explained here [README for running ghost in docker](../README.md).

2. After selecting a version, you will be ask to enter the email, password and url for the ghost version introduced above.

3. Then, the `sh` will execute Kraken and will generate screenshots of the tests those can be found in VRT folder.

4. steps 1, 2 and 3 will be done again. In this case, you have to choose the other version of ghost. 

5.  BackstopJS will be executed and the result of the `sh` will open the reports automatically.

## Authors

- Cristian Camilo Pinzon Hernandez
- Juan Carlos De Jesus
- Alex Santiago Meneses Sanchez
- Andersen Castañeda
