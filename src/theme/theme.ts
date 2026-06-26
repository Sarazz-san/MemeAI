export const darkColors = {
  background: '#0A0A0F',
  card: '#13131A',
  cardRaised: '#0F0F1A',
  input: '#1C1C27',
  tabBar: '#0D0D14',
  border: '#1E1E2E',
  borderMuted: '#2A2A3A',
  text: '#FFFFFF',
  textMuted: '#A0A0B0',
  placeholder: '#505060',
  success: '#00E676',
  danger: '#FF4E50',
  warning: '#FFD700',
  info: '#00E5FF',
  orange: '#FF8C42',
  blue: '#2979FF',
  violet: '#AA00FF',
  pink: '#FF4081',
};

export const lightColors = {
  background: '#F7F7FB',
  card: '#FFFFFF',
  cardRaised: '#FFFFFF',
  input: '#ECECF4',
  tabBar: '#FFFFFF',
  border: '#DADAE8',
  borderMuted: '#C6C6D6',
  text: '#11111A',
  textMuted: '#626274',
  placeholder: '#8C8CA0',
  success: '#00A85A',
  danger: '#E3343F',
  warning: '#C99500',
  info: '#008EAD',
  orange: '#DD6B20',
  blue: '#2367D8',
  violet: '#8500CC',
  pink: '#D61F6F',
};

export const colors = darkColors;

export type AppColors = typeof darkColors;
export type ThemeMode = 'dark' | 'light';

export const rainbow = [
  darkColors.danger,
  darkColors.orange,
  darkColors.warning,
  darkColors.success,
  darkColors.blue,
  darkColors.violet,
];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 999,
};

export const typography = {
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
  },
  h1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
  micro: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
};
