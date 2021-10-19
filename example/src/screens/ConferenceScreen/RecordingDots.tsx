import COLORS from '@constants/colors.constants';
import Text from '@ui/Text';
import { FunctionComponent, useEffect, useState } from 'react';
import React from 'react';

type RecordingDotsText = {
  text?: string;
};

export const RecordingDotsText: FunctionComponent<RecordingDotsText> = ({
  text = null,
}) => {
  const [dots, setDots] = useState<string>('');
  useEffect(() => {
    const animation = setInterval(() => {
      if (dots.length >= 3) {
        setDots('');
        return;
      }
      setDots((dots) => dots + '.');
    }, 700);
    return () => clearInterval(animation);
  }, [dots]);

  return (
    <Text color={COLORS.PINK} size="s" align="center">
      {text}
      {dots}
    </Text>
  );
};
