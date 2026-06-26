import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppTheme} from '../theme/ThemeProvider';
import {radii, rainbow, typography} from '../theme/theme';

type SecondaryButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function SecondaryButton({
  label,
  icon,
  onPress,
  accessibilityLabel,
}: SecondaryButtonProps) {
  const {colors} = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      style={({pressed}) => [styles.pressable, pressed && styles.pressed]}>
      <LinearGradient
        colors={rainbow}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.border}>
        <View style={[styles.inner, {backgroundColor: colors.card}]}>
          {icon}
          <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    minHeight: 48,
    borderRadius: radii.md,
  },
  border: {
    flex: 1,
    borderRadius: radii.md,
    padding: 1.5,
  },
  inner: {
    flex: 1,
    minHeight: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
  },
  label: {
    ...typography.label,
  },
  pressed: {
    opacity: 0.85,
    transform: [{scale: 0.98}],
  },
});
