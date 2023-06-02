import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Logger from './Logger';
import styles from './Logger.style';

const LoggerList: React.FC = () => {
  const [logs, setLogs] = useState<string[]>();

  useEffect(() => {
    setLogs(Logger.getInstance().getLogs())
    Logger.getInstance().onUpdate = setLogs

    return () => {
       Logger.getInstance().onUpdate = undefined;
    };
  }, []);

  const renderLog = ({ item }: { item: string }) => {
    return <Text style={styles.item}>{item}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logs: </Text>
      <FlatList data={logs} renderItem={renderLog} />
    </View>
  );
};

export default LoggerList;
