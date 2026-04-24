import type { ThemeColors } from '@tetherto/pearpass-lib-ui-kit'

export const createStyles = (colors: ThemeColors) => ({
  root: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    width: '100%',
    height: '100%',
    backgroundColor: colors.colorSurfacePrimary,
    overflow: 'hidden' as const
  },

  main: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    flex: 1,
    minWidth: 0,
    height: '100%',
    backgroundColor: colors.colorSurfacePrimary
  }
})
