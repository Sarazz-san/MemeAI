import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IconSymbol, type IconName} from '../components/IconSymbol';
import {MemePreview} from '../components/MemePreview';
import {ScreenHeader} from '../components/ScreenHeader';
import {Waveform} from '../components/Waveform';
import {colors, radii, rainbow, spacing, typography} from '../theme/theme';

type VoiceState = 'idle' | 'recording' | 'processing' | 'done';

export function VoiceToMemeScreen() {
  const [state, setState] = useState<VoiceState>('idle');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (state !== 'recording') {
      return;
    }

    const interval = setInterval(() => {
      setSeconds(value => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  function handleRecordPress() {
    if (state === 'idle' || state === 'done') {
      setSeconds(0);
      setState('recording');
      return;
    }

    if (state === 'recording') {
      setState('processing');
      setTimeout(() => setState('done'), 1000);
    }
  }

  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(
    seconds % 60,
  ).padStart(2, '0')}`;
  const isRecording = state === 'recording';
  const isProcessing = state === 'processing';
  const recordIcon: IconName = isProcessing
    ? 'magic'
    : isRecording
      ? 'close'
      : state === 'done'
        ? 'check'
        : 'mic';

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Voice-to-Meme" subtitle="Parle, l'IA fait le reste" />
      <ScrollView contentContainerStyle={styles.content}>
        <Waveform active={isRecording || isProcessing} />

        <Text style={styles.timer}>{time}</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            isRecording ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"
          }
          disabled={isProcessing}
          onPress={handleRecordPress}
          style={({pressed}) => [
            styles.recordButton,
            pressed && !isProcessing ? styles.recordPressed : undefined,
          ]}>
          <LinearGradient
            colors={isRecording ? [colors.danger, colors.danger] : rainbow}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.recordGradient}>
            <IconSymbol name={recordIcon} color="#FFFFFF" size={34} />
          </LinearGradient>
        </Pressable>

        <Text style={styles.hint}>
          {state === 'idle'
            ? 'Appuie pour commencer'
            : state === 'recording'
              ? `En cours... ${time}`
              : state === 'processing'
                ? "L'IA analyse..."
                : 'Terminé !'}
        </Text>

        {state === 'done' ? (
          <View style={styles.preview}>
            <MemePreview
              title="Mème généré"
              transcription="Je voulais juste envoyer une note vocale rapide, maintenant tout le groupe débat."
              caption="POV: ta note vocale devient une réunion d'urgence."
            />
          </View>
        ) : undefined}
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
    alignItems: 'center',
  },
  timer: {
    color: colors.text,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700',
    marginTop: spacing.xxxl,
    fontVariant: ['tabular-nums'],
  },
  recordButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginTop: spacing.xxl,
    shadowColor: colors.violet,
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 6},
    elevation: 10,
  },
  recordGradient: {
    flex: 1,
    borderRadius: radii.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordPressed: {
    transform: [{scale: 0.96}],
    opacity: 0.85,
  },
  hint: {
    ...typography.caption,
    color: colors.placeholder,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  preview: {
    width: '100%',
    marginTop: 40,
  },
});
