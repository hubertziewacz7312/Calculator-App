import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  backgroundColor: string;
  color: string;
  borderColor: string;
  disable: boolean;
  width: string;
  onPress: () => void;
}

const PortraitButtonComponent = ({ title, backgroundColor, color, borderColor, disable, width, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor, width: width || '25%' },
      ]}
      onPress={onPress}
      disabled={disable}
    >
      <Text style={[styles.buttonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '25%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  buttonText: {
    fontSize: 24,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default PortraitButtonComponent;
