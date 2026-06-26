import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, radii, rainbow, spacing} from '../theme/theme';

type WaveformProps = {
  active?: boolean;
};

const bars = [24, 44, 32, 64, 40, 72, 30, 58, 36, 68, 28, 52, 34, 60];

export function Waveform({active = false}: WaveformProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 420,
          useNativeDriver: false,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 420,
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [active, pulse]);

  return (
    <View style={styles.wrap}>
      {bars.map((height, index) => {
        const animatedHeight = pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [active ? height * 0.55 : 18, active ? height : 18],
        });

        return (
          <Animated.View
            key={`${height}-${index}`}
            style={[styles.barOuter, {height: animatedHeight}]}>
            {active ? (
              <LinearGradient colors={rainbow} style={styles.bar} />
            ) : (
              <View style={[styles.bar, styles.inactiveBar]} />
            )}
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 92,
    width: '100%',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  barOuter: {
    width: 8,
    minHeight: 18,
    borderRadius: 6,
    overflow: 'hidden',
  },
  bar: {
    flex: 1,
    borderRadius: 6,
  },
  inactiveBar: {
    backgroundColor: colors.borderMuted,
  },
});
