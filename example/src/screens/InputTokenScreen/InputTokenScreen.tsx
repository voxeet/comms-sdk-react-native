import React, {
    FunctionComponent,
    useContext,
    useState,
  } from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  import { DolbyIOContext } from '@components/DolbyIOProvider';
  import { NavigationContext } from '../../navigation/NavigationProvider';
  import { Screens } from '../../navigation/ScreenFactory';
  import COLORS from '@constants/colors.constants';
  import Input from '@ui/Input';
  import Space from '@ui/Space';
  import Text from '@ui/Text';
  import Button from '@ui/Button';
  
  import styles from './InputTokenScreen.style';
  
  const InputTokenScreen: FunctionComponent = () => {
    const { initialize } = useContext(DolbyIOContext);
    const { setScreen } = useContext(NavigationContext);
    const [token, setToken] = useState('');

    const onInitialize = async () => {
      await initialize(token, async () => token);
      setScreen(Screens.LoginScreen);
    }
  
    return (
        <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
          <SafeAreaView style={styles.wrapper}>
            <Space mh="m" mv="s">
              <Space mb="l" style={styles.center}>
                <Text color={COLORS.WHITE} header>
                  Dolby.io
                </Text>
                <Text color={COLORS.WHITE} size="s">
                  IAPI SDK for React Native
                </Text>
                <Text color={COLORS.WHITE} size="xs" header>
                  TEST APP
                </Text>
              </Space>
              <Text color={COLORS.WHITE} header size="s">
                Token
              </Text>
              <Space mt="m">
                <Input label="Your token" onChange={setToken} value={token} />
              </Space>
              <Space mt="m">
                <Button text="Initialize" onPress={onInitialize} />
              </Space>
            </Space>
          </SafeAreaView>
        </LinearGradient>
    );
  };
  
  export default InputTokenScreen;
  