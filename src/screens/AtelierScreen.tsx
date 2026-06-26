import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppCard} from '../components/AppCard';
import {GradientButton} from '../components/GradientButton';
import {IconSymbol} from '../components/IconSymbol';
import {ScreenHeader} from '../components/ScreenHeader';
import {useAppTheme} from '../theme/ThemeProvider';
import {spacing, typography} from '../theme/theme';

const tools = [
  {icon: 'text' as const, title: 'Texte', body: 'Ajoute une punchline, un sous-titre ou une réaction.'},
  {icon: 'image' as const, title: 'Image', body: 'Importe une base de mème ou une photo locale.'},
  {icon: 'magic' as const, title: 'Style', body: 'Position, couleur, outline et rendu sticker.'},
];

export function AtelierScreen() {
  const {colors} = useAppTheme();

  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <ScreenHeader
        title="Atelier"
        subtitle="Crée tes propres mèmes manuellement"
      />
      <ScrollView contentContainerStyle={styles.content}>
        <AppCard result>
          <View style={styles.canvas}>
            <Text style={styles.canvasTop}>TON TEXTE ICI</Text>
            <Text style={styles.canvasCenter}>MemeAI Studio</Text>
            <Text style={styles.canvasBottom}>TA CHUTE ICI</Text>
          </View>
        </AppCard>

        <View style={styles.toolGrid}>
          {tools.map(tool => (
            <AppCard key={tool.title} style={styles.toolCard}>
              <IconSymbol name={tool.icon} color={colors.info} size={24} />
              <Text style={[styles.toolTitle, {color: colors.text}]}>
                {tool.title}
              </Text>
              <Text style={[styles.toolBody, {color: colors.textMuted}]}>
                {tool.body}
              </Text>
            </AppCard>
          ))}
        </View>

        <GradientButton
          label="Nouveau mème manuel"
          icon={<IconSymbol name="atelier" color="#FFFFFF" size={18} />}
        />
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
  canvas: {
    height: 260,
    borderRadius: 18,
    backgroundColor: '#20202A',
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  canvasTop: {
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  canvasCenter: {
    color: '#A0A0B0',
    ...typography.h2,
    textAlign: 'center',
  },
  canvasBottom: {
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  toolGrid: {
    gap: spacing.md,
  },
  toolCard: {
    gap: spacing.sm,
  },
  toolTitle: {
    ...typography.h3,
  },
  toolBody: {
    ...typography.caption,
  },
});
