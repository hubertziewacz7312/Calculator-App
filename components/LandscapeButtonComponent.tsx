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

const LandscapeButtonComponent = ({ title, backgroundColor, color, borderColor, disable, width, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor, width: width || '10%' },
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
    width: '10%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  buttonText: {
    fontSize: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default LandscapeButtonComponent;
