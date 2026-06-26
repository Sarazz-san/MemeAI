import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppCard} from '../components/AppCard';
import {Badge} from '../components/Badge';
import {EmptyState} from '../components/EmptyState';
import {GradientButton} from '../components/GradientButton';
import {IconSymbol} from '../components/IconSymbol';
import {ScreenHeader} from '../components/ScreenHeader';
import {
  mockStatuses,
  StatusGrid,
  type StatusItem,
} from '../components/StatusGrid';
import {colors, radii, spacing, typography} from '../theme/theme';

export function StatusRemixerScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [selected, setSelected] = useState<StatusItem | null>(null);
  const [caption, setCaption] = useState('Quand ton statut WhatsApp devient plus drôle que prévu.');
  const [loading, setLoading] = useState(false);

  function generateCaption() {
    setLoading(true);
    setTimeout(() => {
      setCaption('Moi après avoir juré que ce statut ne me concernait pas.');
      setLoading(false);
    }, 900);
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Status Remixer"
        subtitle="Transforme tes statuts WhatsApp en mèmes"
      />
      <ScrollView contentContainerStyle={styles.content}>
        {!permissionGranted ? (
          <AppCard style={styles.permissionCard}>
            <View style={styles.permissionIcon}>
              <IconSymbol name="folder" color={colors.warning} size={24} />
            </View>
            <Text style={styles.cardTitle}>Accès au stockage requis</Text>
            <Text style={styles.cardText}>
              L'app a besoin d'accéder à tes statuts WhatsApp sauvegardés.
            </Text>
            <GradientButton
              label="Autoriser l'accès"
              onPress={() => setPermissionGranted(true)}
              style={styles.permissionButton}
            />
          </AppCard>
        ) : mockStatuses.length > 0 ? (
          <>
            <View style={styles.galleryHeader}>
              <Text style={styles.sectionTitle}>Statuts WhatsApp</Text>
              <Badge label={`${mockStatuses.length}`} tone="info" />
            </View>
            <StatusGrid data={mockStatuses} onSelect={setSelected} />
          </>
        ) : (
          <EmptyState
            icon="📭"
            title="Aucun statut trouvé"
            description="Ouvre WhatsApp et consulte des statuts pour les voir ici."
          />
        )}
      </ScrollView>

      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fermer le statut sélectionné"
              onPress={() => setSelected(null)}
              style={styles.closeButton}>
              <IconSymbol name="close" color={colors.text} size={20} />
            </Pressable>

            {selected ? (
              <ScrollView contentContainerStyle={styles.sheetContent}>
                <LinearGradient colors={selected.colors} style={styles.selectedImage}>
                  <Text style={styles.overlayText}>{caption}</Text>
                </LinearGradient>

                <Text style={styles.sheetLabel}>Texte généré :</Text>
                <Text style={styles.generatedCaption}>"{caption}"</Text>

                <Text style={styles.sheetLabel}>Style du texte :</Text>
                <View style={styles.pills}>
                  {['Impact', 'Bold', 'Outline'].map(style => (
                    <View key={style} style={styles.pill}>
                      <Text style={styles.pillText}>{style}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.sheetLabel}>Couleur :</Text>
                <View style={styles.swatches}>
                  {[colors.text, colors.warning, colors.danger, colors.success, colors.blue].map(
                    swatch => (
                      <View
                        key={swatch}
                        style={[styles.swatch, {backgroundColor: swatch}]}
                      />
                    ),
                  )}
                </View>

                <GradientButton
                  label="Générer caption IA"
                  loading={loading}
                  onPress={generateCaption}
                  icon={<IconSymbol name="zap" color={colors.text} size={18} />}
                />

                <View style={styles.sheetActions}>
                  <GradientButton
                    label="Sauvegarder"
                    icon={<IconSymbol name="download" color={colors.text} size={18} />}
                  />
                  <GradientButton
                    label="Partager"
                    icon={<IconSymbol name="share" color={colors.text} size={18} />}
                  />
                </View>
              </ScrollView>
            ) : undefined}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.huge,
  },
  permissionCard: {
    borderColor: `${colors.warning}66`,
  },
  permissionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.warning}18`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
  },
  cardText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  permissionButton: {
    marginTop: spacing.xxl,
  },
  galleryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.58)',
  },
  sheet: {
    minHeight: '85%',
    maxHeight: '92%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderMuted,
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.xl,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  sheetContent: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  selectedImage: {
    height: 240,
    borderRadius: radii.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: spacing.lg,
    marginBottom: spacing.xxl,
  },
  overlayText: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 5,
    textShadowOffset: {width: 1, height: 1},
  },
  sheetLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  generatedCaption: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xxl,
  },
  pills: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  pill: {
    minHeight: 34,
    borderRadius: radii.round,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderMuted,
    backgroundColor: colors.input,
  },
  pillText: {
    ...typography.caption,
    color: colors.text,
  },
  swatches: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  swatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});
