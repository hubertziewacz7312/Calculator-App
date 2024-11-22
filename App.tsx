import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PortraitButtonComponent from './components/PortraitButtonComponent.tsx';
import { createPortraitButtons } from './buttonsConfig/portraitButtonsConfig.ts';
import Mexp from 'math-expression-evaluator';
import {createLandscapeButtons} from "./buttonsConfig/landscapeButtonsConfig.ts";
import LandscapeButtonComponent from "./components/LandscapeButtonComponent.tsx";
import BootSplash from 'react-native-bootsplash';


const CalculatorApp: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [isPortrait, setIsPortrait] = useState(true);
  const [isRadians, setIsRadians] = useState(true);
  const [memoryValue, setMemoryValue] = useState<number>(0);

  const onButtonPress = (value) => {
    console.log('Pressed:', value);
  };

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  useEffect(() => {
    const updateOrientation = () => {
      const dim = Dimensions.get('window');
      setIsPortrait(dim.height >= dim.width);
    };

    Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();
    return () => {
      Dimensions.addEventListener('change', updateOrientation);
    };
  }, []);

  const handleNumberPress = (num: string) => {
    setDisplayValue((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperatorPress = (op: string) => {
    setDisplayValue((prev) => prev + op);
  };

  const handleEqualPress = () => {
    try {
      const mexp = new Mexp();
      const result = mexp.eval(displayValue);
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const handleClearPress = () => {
    setDisplayValue('0');
  };

  const handleSpecialFunctionPress = (func: string) => {
    try {
      let result;
      switch (func) {
        case 'e^x':
          result = Math.exp(parseFloat(displayValue));
          break;
        case 'x^2':
          result = Math.pow(parseFloat(displayValue), 2);
          break;
        case 'x^3':
          result = Math.pow(parseFloat(displayValue), 3);
          break;
        case 'x!':
          result = factorial(parseInt(displayValue));
          break;
        case '√x':
          result = Math.sqrt(parseFloat(displayValue));
          break;
        case '∛x':
          result = Math.cbrt(parseFloat(displayValue));
          break;
        case 'ln':
          result = Math.log(parseFloat(displayValue));
          break;
        case 'log10':
          result = Math.log10(parseFloat(displayValue));
          break;
        case 'e':
          setDisplayValue(String(Math.E));
          break;
        case 'EE':
          setDisplayValue((prev) => prev + "e");
          break;
        case 'π':
          setDisplayValue((prev) => (prev === "0" ? Math.PI.toString() : prev + Math.PI.toString()));
          break;
        case 'Rand':
          setDisplayValue(String(Math.random()));
      }
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const handleRadToggle = () => {
    setIsRadians(!isRadians);
  }

  const handleTrigFunctionPress = (func: string) => {
    const angleInRadians = isRadians ? parseFloat(displayValue) : parseFloat(displayValue) * (Math.PI / 180);
    let result;
    switch (func) {
      case 'sin':
        result = Math.sin(angleInRadians);
        break;
      case 'cos':
        result = Math.sin(angleInRadians);
        break;
      case 'tan':
        result = Math.tan(angleInRadians);
        break;
      case 'sinh':
        result = Math.sinh(angleInRadians);
        break;
      case 'cosh':
        result = Math.cosh(angleInRadians);
        break;
      case 'tanh':
        result = Math.tanh(angleInRadians);
        break;
    }
    setDisplayValue(String(result));
  }

  const handleMemoryPress = (func: string) => {
    const currentValue = parseFloat(displayValue);

    switch (func) {
      case 'MC':
        setMemoryValue(0);
        break;
      case 'M+':
        setMemoryValue(memoryValue + currentValue);
        break;
      case 'M-':
        setMemoryValue(memoryValue - currentValue);
        break;
      case 'MR':
        setDisplayValue(memoryValue.toString());
        break;

    }
  };

  const handleToggleSign = () => {
    setDisplayValue((prevValue) => {
      const numericValue = parseFloat(prevValue);

      const toggledValue = numericValue * -1;

      return toggledValue.toString();
    });
  };

  const portraitButtons = createPortraitButtons({
    handleClearPress,
    handleNumberPress,
    handleOperatorPress,
    handleEqualPress,
  });

  const PortraitCalculator = () => (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {portraitButtons.map((button, index) => (
          <PortraitButtonComponent key={index} {...button} />
        ))}
      </View>
    </View>
  );

  const landscapeButtons = createLandscapeButtons({
    handleEqualPress,
    handleTrigFunctionPress,
    handleRadToggle,
    handleSpecialFunctionPress,
    handleNumberPress,
    handleOperatorPress,
    handleClearPress,
    handleMemoryPress,
    handleToggleSign,
  });

  const LandscapeCalculator = () => (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {landscapeButtons.map((button, index) => (
          <LandscapeButtonComponent key={index} {...button} />
        ))}
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      {isPortrait ? (
        <PortraitCalculator onButtonPress={onButtonPress} />
      ) : (
        <LandscapeCalculator onButtonPress={onButtonPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#282C34',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#000',
    padding: 20,
  },
  displayText: {
    fontSize: 48,
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  button: {
    width: '25%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444',
    borderWidth: 0.5,
    borderColor: '#666',
  },
  operatorButton: {
    backgroundColor: '#FFA500',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});



function factorial(n: number) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export default CalculatorApp;
