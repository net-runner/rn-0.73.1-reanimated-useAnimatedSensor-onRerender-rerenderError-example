/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

function App(): React.JSX.Element {
  const [testState, setTestState] = useState('test50');
  const rotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const {roll, pitch} = rotation.sensor.value;
    return {
      transform: [
        {
          translateX: withSpring(-roll * 25, {
            damping: 200,
          }),
        },
        {
          translateY: withSpring(-pitch * 25, {
            damping: 200,
          }),
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          backgroundStyle,
          {
            width: 500,
            height: 500,
            backgroundColor: 'blue',
            position: 'absolute',
          },
        ]}
      />
      <Animated.View
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'red',
          position: 'absolute',
        }}
      />
      <Text>Press the boom button to crash the app! {testState}</Text>
      <Button onPress={() => setTestState('BOOM')} title={'Run boom'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
