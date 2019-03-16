import { PackyFiles } from './types';

export const DEFAULT_PACKY_NAME = 'MyPacky';
export const DEFAULT_METADATA_NAME = 'Packy';
export const DEFAULT_METADATA_DESCRIPTION_SAVED = `... saved packy description ...`;
export const DEFAULT_METADATA_DESCRIPTION_EMPTY = `... empty packy description ...`;

export const DEFAULT_DESCRIPTION = 'No description';

export const EDITOR_LOAD_FALLBACK_TIMEOUT = 3000;

export const INITIAL_DEPENDENCIES = {
    'wizzi-t-common': { version: '0.0.1', isUserSpecified: true },
};

export const INITIAL_CODE: PackyFiles = {
  '.wizzi/index.html.ittf': {
      contents: `html
  body
    h1 Hello world
  `,
      type: 'CODE',
  },
  '.wizzi/main.js.ittf': {
      contents: `module
  kind es6
  log 'Hello world'
  `,
      type: 'CODE',
  },
  '.wizzi/main.wfjob.ittf': {
      contents: `wfjob
  `,
      type: 'CODE',
  },
  'README.md': {
      contents: `# Sample Packy
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