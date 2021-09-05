import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { IAPISDK } from '@dolbyio/react-native-iapi-sdk';

export default function App() {
  IAPISDK.initialize("", "");
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    //DolbyioSdk.multiply(3, 7).then(setResult);
    setResult(0);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
