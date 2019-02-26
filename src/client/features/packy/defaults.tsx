import { PackyFiles } from './types';

export const DEFAULT_PACKY_NAME = 'MyPacky';
export const DEFAULT_METADATA_NAME = 'Packy';
export const DEFAULT_METADATA_DESCRIPTION_SAVED = `Try this project on your phone! Use Expo's online editor to make changes and save your own copy.`;
export const DEFAULT_METADATA_DESCRIPTION_EMPTY = `Write code in Expo's online editor and instantly use it on your phone.`;

export const DEFAULT_DESCRIPTION = 'No description';

export const EDITOR_LOAD_FALLBACK_TIMEOUT = 3000;

export const INITIAL_DEPENDENCIES = {
    'wizzi-t-common': { version: '0.0.1', isUserSpecified: true },
};

export const INITIAL_CODE: PackyFiles = {
  'App.js': {
      contents: `import * as React from 'react';
  import { Text, View, StyleSheet } from 'react-native';
  import { Constants } from 'expo';
  
  // You can import from local files
  import AssetExample from './components/AssetExample';
  
  // or any pure javascript modules available in npm
  import { Card } from 'react-native-paper';
  
  export default class App extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Change code in the editor and watch it change on your phone! Save to get a shareable url.
          </Text>
          <Card>
            <AssetExample />
          </Card>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  `,
      type: 'CODE',
    },
    'assets/snack-icon.png': {
      contents:
        'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/2f7d32b1787708aba49b3586082d327b',
      type: 'ASSET',
    },
    'components/AssetExample.js': {
      contents: `import * as React from 'react';
  import { Text, View, StyleSheet, Image } from 'react-native';
  
  export default class AssetExample extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Local files and assets can be imported by dragging and dropping them into the editor
          </Text>
          <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    paragraph: {
      margin: 24,
      marginTop: 0,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    logo: {
      height: 128,
      width: 128,
    }
  });
  `,
      type: 'CODE',
    },
    'README.md': {
      contents: `# Sample Snack app
  
  Welcome to Expo!
  
  Open the \`App.js\` file to start writing some code. You can preview the changes directly on your phone or tablet by clicking the **Run** button or use the simulator by clicking **Tap to Play**. When you're done, click **Save** and share the link!
  
  When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Export** your project and use it with [expo-cli](https://docs.expo.io/versions/latest/introduction/installation.html).
  
  Projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the **Embed** button.
  
  If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.io).
  
  Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack-web).
  `,
      type: 'CODE',
    },
  };
  
  export const INITIAL_PACKY_KINDS: {[key: string]: PackyFiles} = {
    'react': {
      '.wizzi/root/package.json.ittf': {
        type: 'CODE',
        contents: `{
    name "helloreact"`
      },
      '.wizzi/generate.wfjob.ittf': {
        type: 'CODE',
        contents: `wfjob helloreact
    $
      var rootFolder = __dirname;`
      }
    },
    'react-redux': {
      '.wizzi/root/package.json.ittf': {
        type: 'CODE',
        contents: `{
    name "helloreactredux"`
      },
      '.wizzi/generate.wfjob.ittf': {
        type: 'CODE',
        contents: `wfjob helloreactredux
    $
      var rootFolder = __dirname;`
      }
    },
    'react-redux-router': {
      '.wizzi/root/package.json.ittf': {
        type: 'CODE',
        contents: `{
    name "helloreactreduxrouter"`
      },
      '.wizzi/generate.wfjob.ittf': {
        type: 'CODE',
        contents: `wfjob helloreactreduxrouter
    $
      var rootFolder = __dirname;`
      }
    }
  }