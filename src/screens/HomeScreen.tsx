import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Badge} from '../components/Badge';
import {IconSymbol} from '../components/IconSymbol';
import {ScreenHeader} from '../components/ScreenHeader';
import {useAppTheme} from '../theme/ThemeProvider';
import {colors as baseColors, rainbow, spacing, typography} from '../theme/theme';

type MemePreviewItem = {
  id: string;
  title: string;
  caption: string;
  palette: string[];
};

type MemePackage = {
  id: string;
  title: string;
  subtitle: string;
  memes: MemePreviewItem[];
};

const packages: MemePackage[] = [
  {
    id: 'reaction',
    title: 'Réactions rapides',
    subtitle: 'Réponses prêtes pour discussions et statuts',
    memes: [
      {
        id: 'reaction-1',
        title: 'No way',
        caption: 'Quand le groupe découvre enfin la vérité',
        palette: [baseColors.danger, baseColors.orange],
      },
      {
        id: 'reaction-2',
        title: 'Silence',
        caption: 'Moi après avoir envoyé le mauvais vocal',
        palette: [baseColors.blue, baseColors.violet],
      },
      {
        id: 'reaction-3',
        title: 'Regard',
        caption: 'La preuve était dans le screenshot',
        palette: [baseColors.success, baseColors.info],
      },
      {
        id: 'reaction-4',
        title: 'Drama',
        caption: 'Personne n’a demandé mais tout le monde suit',
        palette: [baseColors.pink, baseColors.warning],
      },
    ],
  },
  {
    id: 'school',
    title: 'Campus',
    subtitle: 'Cours, deadlines, exposés et travaux de groupe',
    memes: [
      {
        id: 'school-1',
        title: 'Deadline',
        caption: 'Quand le devoir sort la veille',
        palette: [baseColors.warning, baseColors.danger],
      },
      {
        id: 'school-2',
        title: 'Exposé',
        caption: 'Le membre absent devient expert le jour J',
        palette: [baseColors.info, baseColors.blue],
      },
      {
        id: 'school-3',
        title: 'Notes',
        caption: 'Le barème avait ses propres projets',
        palette: [baseColors.violet, baseColors.pink],
      },
      {
        id: 'school-4',
        title: 'Groupe',
        caption: 'Travail de groupe, effort individuel',
        palette: [baseColors.success, baseColors.warning],
      },
    ],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Status',
    subtitle: 'Formats carrés faciles à partager',
    memes: [
      {
        id: 'whatsapp-1',
        title: 'Vu',
        caption: 'Vu à 14:03, réponse prévue en 2029',
        palette: rainbow,
      },
      {
        id: 'whatsapp-2',
        title: 'Statut',
        caption: 'Ce statut ne vise personne officiellement',
        palette: [baseColors.success, baseColors.blue],
      },
      {
        id: 'whatsapp-3',
        title: 'Famille',
        caption: 'Quand tata découvre les stickers',
        palette: [baseColors.orange, baseColors.pink],
      },
      {
        id: 'whatsapp-4',
        title: 'Online',
        caption: 'En ligne mais émotionnellement absent',
        palette: [baseColors.info, baseColors.violet],
      },
    ],
  },
];

export function HomeScreen() {
  const {colors} = useAppTheme();
  const [selectedPackage, setSelectedPackage] = useState<MemePackage | null>(
    null,
  );

  if (selectedPackage) {
    return (
      <View style={[styles.screen, {backgroundColor: colors.background}]}>
        <View style={styles.packageHeader}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retour aux packages"
            onPress={() => setSelectedPackage(null)}
            style={({pressed}) => [
              styles.backButton,
              {backgroundColor: colors.card, borderColor: colors.border},
              pressed && styles.pressed,
            ]}>
            <IconSymbol name="close" size={20} color={colors.text} />
          </Pressable>
          <View style={styles.packageTitleWrap}>
            <Text style={[styles.packageTitle, {color: colors.text}]}>
              {selectedPackage.title}
            </Text>
            <Text style={[styles.packageSubtitle, {color: colors.textMuted}]}>
              {selectedPackage.subtitle}
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.fullGrid}>
          {selectedPackage.memes.map(meme => (
            <MemeTile key={meme.id} meme={meme} large />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <ScreenHeader
        title="Home"
        subtitle="Découvre des packages de mèmes prêts à adapter"
      />
      <ScrollView contentContainerStyle={styles.content}>
        {packages.map(pkg => (
          <View key={pkg.id} style={styles.packageSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionCopy}>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>
                  {pkg.title}
                </Text>
                <Text style={[styles.sectionSubtitle, {color: colors.textMuted}]}>
                  {pkg.subtitle}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Afficher ${pkg.title}`}
                onPress={() => setSelectedPackage(pkg)}
                style={({pressed}) => [
                  styles.showButton,
                  {borderColor: colors.border, backgroundColor: colors.card},
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.showLabel, {color: colors.text}]}>
                  Afficher
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.packageRail}>
              {pkg.memes.map(meme => (
                <MemeTile key={meme.id} meme={meme} />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function MemeTile({
  meme,
  large = false,
}: {
  meme: MemePreviewItem;
  large?: boolean;
}) {
  const {colors} = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={meme.title}
      style={({pressed}) => [
        large ? styles.tileLarge : styles.tile,
        pressed && styles.pressed,
      ]}>
      <LinearGradient colors={meme.palette} style={styles.tileArt}>
        <View style={styles.tileBadgeRow}>
          <Badge label="MemeAI" tone="info" />
        </View>
        <Text style={styles.tileTitle}>{meme.title}</Text>
      </LinearGradient>
      <View style={[styles.tileCaption, {backgroundColor: colors.card}]}>
        <Text
          numberOfLines={large ? 3 : 2}
          style={[styles.tileCaptionText, {color: colors.text}]}>
          {meme.caption}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.huge,
    gap: spacing.xxxl,
  },
  packageSection: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  sectionCopy: {
    flex: 1,
  },
  sectionTitle: {
    ...typography.h3,
  },
  sectionSubtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  showButton: {
    minHeight: 36,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showLabel: {
    ...typography.label,
    fontSize: 13,
  },
  packageRail: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  tile: {
    width: 158,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tileLarge: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  tileArt: {
    aspectRatio: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  tileBadgeRow: {
    alignItems: 'flex-start',
  },
  tileTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 4,
    textShadowOffset: {width: 1, height: 1},
  },
  tileCaption: {
    minHeight: 68,
    padding: spacing.md,
  },
  tileCaptionText: {
    ...typography.caption,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.82,
    transform: [{scale: 0.98}],
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageTitleWrap: {
    flex: 1,
  },
  packageTitle: {
    ...typography.h2,
  },
  packageSubtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  fullGrid: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.huge,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});
