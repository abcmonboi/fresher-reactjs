import React from 'react';
import { useTheme, Text } from '@nextui-org/react';


const Home = () => {
    const { theme } = useTheme();

  return (
    <>
      <Text
        css={{
          color: '$blue800',
          fontSize: '$sm',
          padding: '$2 $4'
        }}
      >
        Using tokens
      </Text>
      <p
        style={{
          color: theme.colors.gradient.value,
          fontSize: theme.fontSizes.sm.value,
          padding: `${theme.space[2].value} ${theme.space[4].value}`
        }}
      >
        Using color theme value
      </p>
    </>
  );
};

export default Home;