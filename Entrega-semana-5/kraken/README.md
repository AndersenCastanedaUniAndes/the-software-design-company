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

## Usage

To run kraken with the tests just execute the following command: 

```bash 
npx kraken-node run
```

## Authors 

* Cristian Camilo Pinzon Hernandez
* Juan Carlos De Jesus
* Alex Santiago Meneses Sanchez
* Andersen Castañeda 
