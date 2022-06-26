export default {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: {
        target: 'ES2019',
      },
    },
  },
  testMatch: ['**/*.test.(ts|tsx)'],
};
