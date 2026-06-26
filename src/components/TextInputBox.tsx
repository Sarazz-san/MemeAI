import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {useAppTheme} from '../theme/ThemeProvider';
import {radii, spacing, typography} from '../theme/theme';

export function TextInputBox(props: TextInputProps) {
  const {colors} = useAppTheme();

  return (
    <TextInput
      placeholderTextColor={colors.placeholder}
      selectionColor={colors.info}
      multiline
      textAlignVertical="top"
      {...props}
      style={[
        styles.input,
        {
          borderColor: colors.borderMuted,
          backgroundColor: colors.input,
          color: colors.text,
        },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 140,
    maxHeight: 240,
    width: '100%',
    borderRadius: radii.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    ...typography.body,
  },
});
