// @ts-ignore
import Chance from 'chance';
import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import CommsAPI from '@dolbyio/comms-sdk-react-native';
import Button from '@ui/Button';
import Input from '@ui/Input';
import Space from '@ui/Space';
import Text from '@ui/Text';

import styles from './LoginScreen.style';
import Logger from '@utils/Logger/Logger';
import { Alert } from 'react-native';
import { NavigationContext } from '../../navigation/NavigationProvider';
import { Screens } from '../../navigation/ScreenFactory';

const chance = new Chance();

const LoginScreen: FunctionComponent = () => {
  const [name, setName] = useState(`${chance.first()} ${chance.last()}`);
  const [externalId, setExternalId] = useState('');
  const { isOpen, openSession, closeSession, setSessionParticipant } = useContext(DolbyIOContext);
  const { setScreen } = useContext(NavigationContext);

  const goToJoinScreen = async () => {
    console.log("go to join screen");
    const isSessionOpen = await isOpen();
    if (isSessionOpen == true) {
      setSessionParticipant();
      setScreen(Screens.JoinScreen);
    } else {
      Alert.alert("The session is not open.");
    }
  }

  const openSessionButton = async () => {
    try {
      await openSession(name, externalId);
      Logger.log(`logged in ${name}, ${externalId}`);
    } catch (e) {
      Logger.log(`Open session error: ${e}`);
    }
  }

  const isSessionOpenButton = async () => {
    const isSessionOpen = await isOpen();
    Alert.alert(`Session isOpen: ${isSessionOpen}`)
  }

  const closeSessionButton = async () => {
    try {
      await closeSession();
      Logger.log(`logged out`);
    } catch (e) {
      Logger.log(`Close session error: ${e}`);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await CommsAPI.conference.leave({ leaveRoom: true });
      } catch (e) {
        Logger.log(`Leave error: ${e}`);
        try {
          await CommsAPI.session.close();
        } catch (e2) {}
      }
    })();
  }, []);

  return (
    <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <Space mh="m" mv="s">
          <Space mb="s" style={styles.center}>
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
            Login
          </Text>
          <Space mt="m">
            <Input label="Your name" onChange={setName} value={name} />
          </Space>
          <Space mt="m">
            <Input
              label="External ID (optional)"
              onChange={setExternalId}
              value={externalId}
            />
          </Space>
          <Space mt="m">
            <Button text={"Open session"} onPress={openSessionButton} />
          </Space>
          <Space mt="m">
            <Button text={"Is session open"} onPress={isSessionOpenButton} />
          </Space>
          <Space mt="m">
            <Button text={"Close session"} onPress={closeSessionButton} />
          </Space>
          <Space mt="m">
            <Button text={'Go to create conference screen'} onPress={goToJoinScreen} />
          </Space>
        </Space>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
