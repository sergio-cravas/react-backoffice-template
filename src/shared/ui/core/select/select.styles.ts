import { StylesConfig } from 'react-select';

import colors from '@/styles/exports/colors.module.scss';

export const selectStyles = ({ invalid = false }: { invalid?: boolean }): StylesConfig => ({
  container: (baseStyles) => ({
    ...baseStyles,
    height: 41,
    width: '100%',
  }),
  control: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    height: '100%',
    color: 'white',
    cursor: 'pointer',
    borderRadius: 4,
    backgroundColor: colors.backgroundPrimary,
    borderColor: isFocused
      ? colors.interactionOutlineHover
      : invalid
        ? colors.interactionRedBase
        : colors.interactionOutlineBase,
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    marginTop: 8,
    paddingBlock: 0,
    backgroundColor: colors.backgroundPrimary,
    boxShadow: '0px 4px 20px #E6E9EF',
  }),
  option: (baseStyles, { isSelected, isFocused }) => ({
    ...baseStyles,
    cursor: 'pointer',
    color: isSelected ? colors.contentDarkPrimary : colors.contentDarkSecondary,
    backgroundColor: isFocused ? colors.interactionSecondaryHover : colors.interactionSecondaryBase,
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: colors.contentDarkTertiary,
  }),
});
