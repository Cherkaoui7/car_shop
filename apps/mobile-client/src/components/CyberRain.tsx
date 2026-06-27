import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { colors } from '@carshop/design-tokens';

const { width, height } = Dimensions.get('window');

const DROPS_COUNT = 30; // Optimized for mobile performance

const Drop = () => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const xPos = useRef(Math.random() * width).current;
  const opacity = useRef(0.1 + Math.random() * 0.4).current;
  const length = useRef(15 + Math.random() * 30).current;
  const duration = useRef(1000 + Math.random() * 2000).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(-100);
      Animated.timing(translateY, {
        toValue: height + 100,
        duration: duration,
        useNativeDriver: true,
      }).start(() => animate());
    };
    
    // Random initial delay so they don't all fall at once
    setTimeout(() => {
      animate();
    }, Math.random() * 2000);
  }, []);

  return (
    <Animated.View
      style={[
        styles.drop,
        {
          left: xPos,
          height: length,
          opacity: opacity,
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

export function CyberRain() {
  const [drops, setDrops] = useState<number[]>([]);

  useEffect(() => {
    // Generate array of drops only once on mount
    const arr = Array.from({ length: DROPS_COUNT }, (_, i) => i);
    setDrops(arr);
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {drops.map((i) => (
        <Drop key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill as any,
    overflow: 'hidden',
    zIndex: 0,
  },
  drop: {
    position: 'absolute',
    width: 2,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
