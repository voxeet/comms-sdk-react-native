// m, mv, mh, mt, mr, mb, ml, p, pv, ph, pt, pr, pb, pl
// fw for width 100%
// fh for height 100%
import { SPACES } from '@constants/sizes.constants';

const options = [
  ['m', 'margin'],
  ['mv', 'marginVertical'],
  ['mh', 'marginHorizontal'],
  ['mt', 'marginTop'],
  ['mr', 'marginRight'],
  ['mb', 'marginBottom'],
  ['ml', 'marginLeft'],
  ['p', 'padding'],
  ['pv', 'paddingVertical'],
  ['ph', 'paddingHorizontal'],
  ['pt', 'paddingTop'],
  ['pr', 'paddingRight'],
  ['pb', 'paddingBottom'],
  ['pl', 'paddingLeft'],
];
const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

// @ts-ignore
const spaceStyles = options.reduce(
  (result, [key, attribute]) => ({
    ...result,
    ...sizes.reduce(
      (sizesResult, size) => ({
        ...sizesResult,
        [`${key}_${size}`]: {
          // @ts-ignore
          [attribute]: SPACES[`SPACE_${size.toUpperCase()}`],
        },
      }),
      {}
    ),
  }),
  {}
);

const styles = {
  ...spaceStyles,
  fw: {
    width: '100%',
  },
  fh: {
    height: '100%',
  },
};

export default styles;
