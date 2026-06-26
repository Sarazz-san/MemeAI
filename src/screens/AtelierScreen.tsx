import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {IconSymbol} from '../components/IconSymbol';
import {shareMemeText} from '../services/share';
import {useAppTheme} from '../theme/ThemeProvider';
import {spacing, typography} from '../theme/theme';

const tools = [
  {icon: 'image' as const, title: 'Add', type: 'image'},
  {icon: 'text' as const, title: 'Text', type: 'text'},
  {icon: 'smile' as const, title: 'Emoji', type: 'emoji'},
  {icon: 'sticker' as const, title: 'Sticker', type: 'sticker'},
  {icon: 'gif' as const, title: 'GIF Sticker', type: 'gif'},
  {icon: 'background' as const, title: 'Background', type: 'background'},
];

type EditorLayer = {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
};

export function AtelierScreen() {
  const {colors} = useAppTheme();
  const [layers, setLayers] = useState<EditorLayer[]>([
    {id: 'text-1', type: 'text', label: 'TON MEME ICI', x: 18, y: 18},
  ]);
  const [selectedLayerId, setSelectedLayerId] = useState('text-1');
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  function addLayer(type: string) {
    if (type === 'background') {
      setBackgroundIndex(index => (index + 1) % 3);
      return;
    }

    const labels: Record<string, string> = {
      image: 'IMAGE',
      text: 'NOUVEAU TEXTE',
      emoji: '😎',
      sticker: 'STICKER',
      gif: 'GIF',
    };
    const nextLayer = {
      id: `${type}-${Date.now()}`,
      type,
      label: labels[type] ?? type.toUpperCase(),
      x: 12 + (layers.length % 3) * 22,
      y: 20 + (layers.length % 4) * 16,
    };

    setLayers(current => [...current, nextLayer]);
    setSelectedLayerId(nextLayer.id);
  }

  function deleteSelectedLayer() {
    setLayers(current => current.filter(layer => layer.id !== selectedLayerId));
    setSelectedLayerId('');
  }

  const selectedLayer = layers.find(layer => layer.id === selectedLayerId);

  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <View style={styles.canvasArea}>
        <View
          style={[
            styles.checkerboard,
            backgroundIndex === 1 ? styles.canvasWarm : undefined,
            backgroundIndex === 2 ? styles.canvasCool : undefined,
          ]}>
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
          {layers.length === 0 ? (
            <>
              <Text style={styles.canvasPlaceholder}>Atelier MemeAI</Text>
              <Text style={styles.canvasHint}>
                Ajoute une image, du texte ou un sticker pour commencer.
              </Text>
            </>
          ) : (
            layers.map(layer => (
              <EditorLayerView
                key={layer.id}
                layer={layer}
                selected={selectedLayerId === layer.id}
                selectedColor={colors.info}
                onPress={() => setSelectedLayerId(layer.id)}
              />
            ))
          )}
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
              onPress={() => addLayer(tool.type)}
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
              {selectedLayer ? selectedLayer.label : 'Nouveau mème'}
            </Text>
            <Text style={[styles.statusText, {color: colors.textMuted}]}>
              {selectedLayer
                ? 'Tap sur un outil pour ajouter un calque.'
                : 'Canvas libre, ajoute un premier élément.'}
            </Text>
          </View>
          <View style={styles.statusActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Supprimer le calque"
              onPress={deleteSelectedLayer}
              style={({pressed}) => [
                styles.savePill,
                {backgroundColor: colors.input},
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.saveText, {color: colors.text}]}>Delete</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Partager le mème"
              onPress={() => shareMemeText('Mème créé dans l’atelier MemeAI')}
              style={({pressed}) => [
                styles.savePill,
                {backgroundColor: colors.info},
                pressed && styles.pressed,
              ]}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

function EditorLayerView({
  layer,
  selected,
  selectedColor,
  onPress,
}: {
  layer: EditorLayer;
  selected: boolean;
  selectedColor: string;
  onPress: () => void;
}) {
  const dynamicStyles = StyleSheet.create({
    layer: {
      left: `${layer.x}%`,
      top: `${layer.y}%`,
      borderColor: selected ? selectedColor : 'transparent',
    },
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Calque ${layer.label}`}
      onPress={onPress}
      style={[
        styles.layer,
        dynamicStyles.layer,
        layer.type === 'image' ? styles.imageLayer : undefined,
        layer.type === 'emoji' ? styles.emojiLayer : undefined,
      ]}>
      <Text
        style={[
          styles.layerText,
          layer.type === 'emoji' ? styles.emojiText : undefined,
        ]}>
        {layer.label}
      </Text>
    </Pressable>
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
  canvasWarm: {
    backgroundColor: '#4A2C33',
  },
  canvasCool: {
    backgroundColor: '#1D3944',
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
  layer: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  imageLayer: {
    width: 120,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  emojiLayer: {
    backgroundColor: 'transparent',
  },
  layerText: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    textShadowColor: '#000000',
    textShadowRadius: 5,
    textShadowOffset: {width: 1, height: 1},
    textAlign: 'center',
  },
  emojiText: {
    fontSize: 42,
    lineHeight: 48,
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
  statusActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  saveText: {
    ...typography.label,
    color: '#FFFFFF',
  },
});
