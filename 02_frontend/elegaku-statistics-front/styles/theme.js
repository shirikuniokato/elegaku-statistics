import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Noto Sans JP', sans-serif`,
    body: `'Noto Sans JP', sans-serif`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: '#F5F5F5',
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        '&:hover': { textDecoration: 'none' },
      },
    },
    // Tabs: {
    //   baseStyle: {},
    //   variants: {
    //     line: {
    //       tablist: {
    //         backgroundColor: '#C0CA33',
    //         // borderTop: '1px solid rgba(45, 45, 45, .1)',
    //       },
    //       tab: {
    //         backgroundColor: '#C0CA33',
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
