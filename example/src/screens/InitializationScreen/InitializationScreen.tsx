import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import Space from '@ui/Space';
import Text from '@ui/Text';
import fetch from '@utils/fetch.util';

import styles from './InitializationScreen.style';

type Key = {
  name: string;
  key: string;
};

const InitializationScreen: FunctionComponent = () => {
  const { initialize } = useContext(DolbyIOContext);
  const [availableKeys, setAvailableKeys] = useState<Key[]>([]);

  useEffect(() => {
    (async () => {
      const keys: any = await fetch.get('REPLACE_ME_WITH_KEYS_URL');
      setAvailableKeys(
        Object.keys(keys)
          .map((key: string) => ({
            name: keys[key],
            key,
          }))
          .sort((a, b) =>
            a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1
          )
      );
    })();
  }, []);

  const getTokenAndInitialize = async (key: string) => {
    const res: { access_token: string } = await fetch.get(
      `REPLACE_ME_WITH_KEYS_URL/${key}`
    );
    initialize(res.access_token, async () => {
      const resp: any = await fetch.get(
        `REPLACE_ME_WITH_KEYS_URL/${key}`
      );
      return resp.access_token;
    });
  };

  return (
    <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <Space mh="m" mv="s">
          <Space mb="l">
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
            Select environment:
          </Text>
        </Space>
        {availableKeys.map(({ key, name }) => (
          <Space mh="s" mt="xs" key={key}>
            <TouchableOpacity
              style={styles.environment}
              onPress={() => getTokenAndInitialize(key)}
            >
              <Text size="m">{name}</Text>
              <Text size="xs">{key}</Text>
            </TouchableOpacity>
          </Space>
        ))}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default InitializationScreen;
