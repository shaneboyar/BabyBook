module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@colors': './src/colors',
            '@components': './src/components',
            '@navigators': './src/navigators',
            '@screens': './src/screens',
          },
        },
        '@babel/plugin-proposal-class-properties',
      ],
    ],
  };
};
