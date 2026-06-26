import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppTheme} from '../theme/ThemeProvider';
import {radii, rainbow, typography} from '../theme/theme';

type GradientButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export function GradientButton({
  label,
  onPress,
  icon,
  loading = false,
  disabled = false,
  style,
  accessibilityLabel,
}: GradientButtonProps) {
  const {colors} = useAppTheme();
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={inactive}
      onPress={onPress}
      style={({pressed}) => [
        styles.pressable,
        {shadowColor: colors.violet},
        style,
        pressed && !inactive ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
      ]}>
      <LinearGradient
        colors={disabled ? ['#2A2A3A', '#1C1C27'] : rainbow}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        {loading ? (
          <ActivityIndicator color={colors.text} />
        ) : (
          <>
            {icon}
            <Text
              style={[
                styles.label,
                {color: disabled ? colors.placeholder : colors.text},
              ]}>
              {label}
            </Text>
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    height: 56,
    borderRadius: radii.lg,
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 4},
    elevation: 8,
  },
  gradient: {
    flex: 1,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    ...typography.label,
    fontSize: 16,
  },
  pressed: {
    opacity: 0.85,
    transform: [{scale: 0.97}],
  },
  disabled: {
    opacity: 0.5,
  },
});
