import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { colors } from '@carshop/design-tokens';

interface Props {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function CyberAccordion({ title, children, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const animation = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const toggleAccordion = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000], // A sufficiently large number to allow content to expand (maxHeight)
  });

  const arrowRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion} activeOpacity={0.8}>
        <Text style={styles.title}>{title}</Text>
        <Animated.Text style={[styles.arrow, { transform: [{ rotate: arrowRotation }] }]}>
          ▼
        </Animated.Text>
      </TouchableOpacity>
      
      <Animated.View style={[styles.contentContainer, { maxHeight: heightInterpolation }]}>
        <View style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  title: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textTransform: 'uppercase',
  },
  arrow: {
    color: colors.primary,
    fontSize: 14,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  content: {
    padding: 16,
    backgroundColor: 'rgba(2, 6, 23, 0.5)',
  }
});
