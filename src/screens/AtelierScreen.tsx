import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {IconSymbol} from '../components/IconSymbol';
import {useAppTheme} from '../theme/ThemeProvider';
import {spacing, typography} from '../theme/theme';

const tools = [
  {icon: 'image' as const, title: 'Add'},
  {icon: 'text' as const, title: 'Text'},
  {icon: 'smile' as const, title: 'Emoji'},
  {icon: 'sticker' as const, title: 'Sticker'},
  {icon: 'gif' as const, title: 'GIF Sticker'},
  {icon: 'background' as const, title: 'Background'},
];

export function AtelierScreen() {
  const {colors} = useAppTheme();

  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <View style={styles.canvasArea}>
        <View style={styles.checkerboard}>
          {Array.from({length: 240}).map((_, index) => (
            <View
              key={index}
              style={[
                styles.checkerCell,
                (Math.floor(index / 12) + index) % 2 === 0
                  ? styles.checkerCellA
                  : styles.checkerCellB,
              ]}
            />
          ))}
        </View>

        <View style={styles.canvasOverlay}>
          <Text style={styles.canvasPlaceholder}>Atelier MemeAI</Text>
          <Text style={styles.canvasHint}>
            Ajoute une image, du texte ou un sticker pour commencer.
          </Text>
        </View>
      </View>

      <View style={[styles.toolbox, {backgroundColor: colors.card}]}>
        <View style={styles.dragHandle} />
        <View style={styles.toolGrid}>
          {tools.map(tool => (
            <Pressable
              key={tool.title}
              accessibilityRole="button"
              accessibilityLabel={tool.title}
              style={({pressed}) => [
                styles.toolButton,
                pressed && styles.pressed,
              ]}>
              <View
                style={[
                  styles.toolIconBox,
                  {borderColor: colors.borderMuted},
                ]}>
                <IconSymbol
                  name={tool.icon}
                  color={colors.text}
                  size={tool.title === 'GIF Sticker' ? 21 : 30}
                />
              </View>
              <Text style={[styles.toolTitle, {color: colors.text}]}>
                {tool.title}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.statusBar, {borderTopColor: colors.border}]}>
          <View>
            <Text style={[styles.statusTitle, {color: colors.text}]}>
              Nouveau mème
            </Text>
            <Text style={[styles.statusText, {color: colors.textMuted}]}>
              Canvas libre, export à brancher ensuite
            </Text>
          </View>
          <View style={[styles.savePill, {backgroundColor: colors.input}]}>
            <Text style={[styles.saveText, {color: colors.text}]}>Save</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  canvasArea: {
    flex: 1,
    minHeight: 240,
    overflow: 'hidden',
  },
  checkerboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  checkerCell: {
    width: `${100 / 12}%`,
    aspectRatio: 1,
  },
  checkerCellA: {
    backgroundColor: '#343438',
  },
  checkerCellB: {
    backgroundColor: '#2C2C30',
  },
  canvasOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  canvasPlaceholder: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 8,
    textShadowOffset: {width: 1, height: 1},
  },
  canvasHint: {
    ...typography.caption,
    color: '#D5D5DC',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  toolbox: {
    minHeight: 330,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  dragHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4B4B55',
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.xxl,
  },
  toolButton: {
    width: '33.333%',
    minHeight: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolIconBox: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolTitle: {
    ...typography.label,
    fontSize: 16,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
    transform: [{scale: 0.97}],
  },
  statusBar: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  statusTitle: {
    ...typography.h3,
  },
  statusText: {
    ...typography.caption,
    marginTop: 2,
  },
  savePill: {
    minHeight: 40,
    borderRadius: 20,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    ...typography.label,
  },
});
