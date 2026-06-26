import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppCard} from '../components/AppCard';
import {GradientButton} from '../components/GradientButton';
import {IconSymbol, type IconName} from '../components/IconSymbol';
import {MemePreview} from '../components/MemePreview';
import {ScreenHeader} from '../components/ScreenHeader';
import {TextInputBox} from '../components/TextInputBox';
import {useAppTheme} from '../theme/ThemeProvider';
import {rainbow, spacing, typography} from '../theme/theme';

const MAX_LENGTH = 700;

type InputAction = {
  icon: IconName;
  label: string;
  helper: string;
};

const inputActions: InputAction[] = [
  {
    icon: 'camera',
    label: 'Caméra',
    helper: 'Capture photo prête à brancher.',
  },
  {
    icon: 'mic',
    label: 'Micro',
    helper: 'Enregistrement audio prêt à brancher.',
  },
  {
    icon: 'import',
    label: 'Importer',
    helper: 'Explorateur de fichiers prêt à brancher.',
  },
];

export function ContextScreen() {
  const {colors} = useAppTheme();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [helper, setHelper] = useState(
    'Écris, colle ou importe un contexte. MemeAI préparera un mème dans cette zone.',
  );
  const [result, setResult] = useState<null | {caption: string; tone: string}>(
    null,
  );

  function handleInputAction(action: InputAction) {
    setResult(null);
    setHelper(action.helper);
  }

  function generateMeme() {
    if (!text.trim()) {
      setHelper('Ajoute d’abord un texte ou importe un contenu pour créer un mème.');
      return;
    }

    setLoading(true);
    setResult(null);
    setHelper("L'IA mélange le contexte, le ton et la punchline.");

    setTimeout(() => {
      setLoading(false);
      setResult({
        caption:
          'Quand le contexte était déjà drôle, mais que MemeAI décide de finir le travail.',
        tone: 'Sarcastique',
      });
    }, 950);
  }

  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <ScreenHeader
        title="Context"
        subtitle="Texte, audio, photo ou fichier : tout commence ici"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.inputWrap}>
          <TextInputBox
            accessibilityLabel="Contexte à transformer en mème"
            placeholder="Écris ou colle ton contexte..."
            value={text}
            maxLength={MAX_LENGTH}
            onChangeText={value => {
              setText(value);
              setResult(null);
            }}
            style={styles.input}
          />

          <View style={styles.inputActions}>
            {inputActions.map(action => (
              <Pressable
                key={action.label}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                onPress={() => handleInputAction(action)}
                style={({pressed}) => [
                  styles.inputAction,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                  pressed && styles.pressed,
                ]}>
                <IconSymbol
                  name={action.icon}
                  color={colors.text}
                  size={action.icon === 'mic' ? 17 : 18}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={[styles.metaText, {color: colors.placeholder}]}>
            {text.length} / {MAX_LENGTH}
          </Text>
          <Text style={[styles.metaText, {color: colors.textMuted}]}>
            Imports: texte, audio, image, fichier
          </Text>
        </View>

        <GradientButton
          label="Créer le mème"
          loading={loading}
          onPress={generateMeme}
          icon={<IconSymbol name="magic" color="#FFFFFF" size={18} />}
        />

        <View style={styles.output}>
          {loading ? (
            <AppCard result>
              <View style={styles.loadingContent}>
                <LinearGradient colors={rainbow} style={styles.loadingOrb}>
                  <ActivityIndicator color="#FFFFFF" />
                </LinearGradient>
                <Text style={[styles.outputTitle, {color: colors.text}]}>
                  Génération en cours
                </Text>
                <Text style={[styles.outputText, {color: colors.textMuted}]}>
                  {helper}
                </Text>
              </View>
            </AppCard>
          ) : result ? (
            <MemePreview caption={result.caption} tone={result.tone} />
          ) : (
            <AppCard>
              <View style={styles.helpContent}>
                <IconSymbol name="context" color={colors.info} size={30} />
                <Text style={[styles.outputTitle, {color: colors.text}]}>
                  Zone de création
                </Text>
                <Text style={[styles.outputText, {color: colors.textMuted}]}>
                  {helper}
                </Text>
              </View>
            </AppCard>
          )}
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
  },
  inputWrap: {
    position: 'relative',
  },
  input: {
    minHeight: 190,
    paddingBottom: 72,
  },
  inputActions: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  inputAction: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.78,
    transform: [{scale: 0.96}],
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  metaText: {
    ...typography.caption,
  },
  output: {
    marginTop: spacing.xxxl,
  },
  helpContent: {
    minHeight: 190,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingContent: {
    minHeight: 190,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingOrb: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputTitle: {
    ...typography.h3,
    textAlign: 'center',
  },
  outputText: {
    ...typography.body,
    textAlign: 'center',
  },
});
