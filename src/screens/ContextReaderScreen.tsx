import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {EmptyState} from '../components/EmptyState';
import {GradientButton} from '../components/GradientButton';
import {IconSymbol} from '../components/IconSymbol';
import {MemePreview} from '../components/MemePreview';
import {ScreenHeader} from '../components/ScreenHeader';
import {TextInputBox} from '../components/TextInputBox';
import {colors, spacing, typography} from '../theme/theme';

const MAX_LENGTH = 500;

export function ContextReaderScreen() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {caption: string; tone: string}>(
    null,
  );

  const canGenerate = text.trim().length > 0;

  function generateMeme() {
    if (!canGenerate) {
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);
      setResult({
        caption: 'Quand tu pensais juste raconter un truc simple, mais le contexte choisit la violence.',
        tone: 'Ironique',
      });
    }, 900);
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Context Reader"
        subtitle="Colle un texte, reçois un mème"
      />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <TextInputBox
          accessibilityLabel="Texte à transformer en mème"
          placeholder="Ton texte ici..."
          value={text}
          maxLength={MAX_LENGTH}
          onChangeText={setText}
        />
        <Text style={styles.counter}>
          {text.length} / {MAX_LENGTH} caractères
        </Text>

        <GradientButton
          label="Générer le mème"
          loading={loading}
          disabled={!canGenerate}
          onPress={generateMeme}
          icon={<IconSymbol name="zap" color={colors.text} size={18} />}
        />

        <View style={styles.resultArea}>
          {loading ? (
            <View style={styles.skeletonCard}>
              <View style={styles.skeletonTitle} />
              <View style={styles.skeletonLine} />
              <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
              <View style={[styles.skeletonLine, styles.skeletonLineTiny]} />
            </View>
          ) : result ? (
            <MemePreview caption={result.caption} tone={result.tone} />
          ) : (
            <EmptyState
              icon="🤔"
              title="Saisis un texte pour commencer"
              description="L'aperçu du mème apparaîtra ici après génération."
            />
          )}
        </View>
      </ScrollView>
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
  counter: {
    ...typography.caption,
    color: colors.placeholder,
    textAlign: 'right',
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  resultArea: {
    marginTop: spacing.xxxl,
  },
  skeletonCard: {
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.md,
  },
  skeletonTitle: {
    width: 130,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  skeletonLine: {
    width: '100%',
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  skeletonLineShort: {
    width: '80%',
  },
  skeletonLineTiny: {
    width: '60%',
  },
});
