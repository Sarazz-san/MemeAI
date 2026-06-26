import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppCard} from '../components/AppCard';
import {IconSymbol} from '../components/IconSymbol';
import {ScreenHeader} from '../components/ScreenHeader';
import {shareAppIntro} from '../services/share';
import {useAppTheme} from '../theme/ThemeProvider';
import {spacing, typography} from '../theme/theme';

const networks = [
  {name: 'WhatsApp', mark: 'W', color: '#25D366'},
  {name: 'Instagram', mark: 'IG', color: '#E4405F'},
  {name: 'TikTok', mark: 'TT', color: '#00F2EA'},
  {name: 'Facebook', mark: 'f', color: '#1877F2'},
  {name: 'X', mark: 'X', color: '#111111'},
  {name: 'Telegram', mark: 'TG', color: '#2AABEE'},
];

export function SocialScreen() {
  const {colors} = useAppTheme();

  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <ScreenHeader
        title="Social"
        subtitle="Créer, importer et partager autour des réseaux"
      />
      <ScrollView contentContainerStyle={styles.content}>
        <AppCard>
          <View style={styles.introRow}>
            <IconSymbol name="social" color={colors.info} size={30} />
            <View style={styles.introCopy}>
              <Text style={[styles.introTitle, {color: colors.text}]}>
                Hub social
              </Text>
              <Text style={[styles.introText, {color: colors.textMuted}]}>
                Cette section servira de passerelle vers les plateformes les plus utilisées.
              </Text>
            </View>
          </View>
        </AppCard>

        <View style={styles.networkGrid}>
          {networks.map(network => (
            <Pressable
              key={network.name}
              accessibilityRole="button"
              accessibilityLabel={`Partager vers ${network.name}`}
              onPress={shareAppIntro}
              style={({pressed}) => [
                styles.networkPressable,
                pressed && styles.pressed,
              ]}>
              <AppCard style={styles.networkCard}>
              <View style={[styles.networkIcon, {backgroundColor: network.color}]}>
                <Text style={styles.networkMark}>{network.mark}</Text>
              </View>
              <Text style={[styles.networkName, {color: colors.text}]}>
                {network.name}
              </Text>
              <Text style={[styles.networkHint, {color: colors.textMuted}]}>
                Partage rapide
              </Text>
              </AppCard>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    gap: spacing.xxl,
  },
  introRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    alignItems: 'center',
  },
  introCopy: {
    flex: 1,
  },
  introTitle: {
    ...typography.h3,
  },
  introText: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  networkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  networkPressable: {
    width: '48%',
  },
  networkCard: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  networkIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  networkMark: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 17,
  },
  networkName: {
    ...typography.h3,
    textAlign: 'center',
  },
  networkHint: {
    ...typography.micro,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
    transform: [{scale: 0.98}],
  },
});
