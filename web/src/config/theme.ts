import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Menu: {
      sizes: {
        xs: {
          fontSize: 'lg',
        },
      },
    },
  },
});

export default theme;
