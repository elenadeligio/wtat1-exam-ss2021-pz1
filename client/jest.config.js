module.exports = {
  verbose: true,
  roots: ["<rootDir>__tests__"],
  //  testMatch: [  "__tests__/**/?(*.)+(spec|test).[jt]s?(x)" ],
  moduleFileExtensions: ["js", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"]
};
