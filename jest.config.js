module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    snapshotSerializers: [
      "enzyme-to-json/serializer"
    ],
    setupFiles: [
      "./src/setupTest.js"
    ]
  };