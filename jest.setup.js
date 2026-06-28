/* global jest */

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const {View} = require('react-native');
  return ({children, ...props}) => React.createElement(View, props, children);
});

jest.mock('react-native-gesture-handler', () => ({}));

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

jest.mock('react-native-document-picker', () => ({
  types: {
    images: 'images',
    audio: 'audio',
  },
  pickSingle: jest.fn(),
  isCancel: jest.fn(),
}));

jest.mock('react-native-view-shot', () => ({
  captureRef: jest.fn(),
}));

jest.mock('react-native-audio-recorder-player', () => {
  return {
    default: {
      startRecorder: jest.fn(),
      stopRecorder: jest.fn(),
      addRecordBackListener: jest.fn(),
      removeRecordBackListener: jest.fn(),
      mmssss: jest.fn(() => '00:00:00'),
    },
  };
});
