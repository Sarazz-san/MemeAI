import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {AppCard} from '../components/AppCard';
import {IconSymbol} from '../components/IconSymbol';
import {ScreenHeader} from '../components/ScreenHeader';
import {useAppTheme} from '../theme/ThemeProvider';
import {spacing, typography} from '../theme/theme';

export function SettingsScreen() {
  const {colors, isDark, toggleMode} = useAppTheme();

  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <ScreenHeader
        title="Settings"
        subtitle="Paramètres de l'application"
      />

      <View style={styles.content}>
        <AppCard>
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <IconSymbol
                name={isDark ? 'moon' : 'sun'}
                color={colors.info}
                size={26}
              />
            </View>
            <View style={styles.settingCopy}>
              <Text style={[styles.settingTitle, {color: colors.text}]}>
                Thème {isDark ? 'sombre' : 'clair'}
              </Text>
              <Text style={[styles.settingText, {color: colors.textMuted}]}>
                Change instantanément l'apparence de MemeAI.
              </Text>
            </View>
            <Switch
              accessibilityLabel="Activer le thème clair"
              value={!isDark}
              onValueChange={toggleMode}
              thumbColor="#FFFFFF"
              trackColor={{false: colors.borderMuted, true: colors.info}}
            />
          </View>
        </AppCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.huge,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  settingIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingCopy: {
    flex: 1,
  },
  settingTitle: {
    ...typography.h3,
  },
  settingText: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});
