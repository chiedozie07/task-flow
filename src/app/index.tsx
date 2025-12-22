import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';


// keep splash visible while we animate
SplashScreen.preventAutoHideAsync().catch(() => { });

export default function SplashScreenPage() {
  const router = useRouter();
  const opacity = new Animated.Value(1);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      // show lottie for ~2.5s then fade and navigate
      await new Promise((r) => setTimeout(r, 2500));

      // fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(async () => {
        if (!mounted) return;
        await SplashScreen.hideAsync();
        // replace stack with tabs
        // router.replace('/(tabs)');
        router.replace('/home');
      });
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {/* <a href="https://lordicon.com/">Icons by Lordicon.com</a> */}
      <LottieView
        source={require('@/assets/lottie/splash.json')}
        autoPlay
        loop={false}
        style={{ width: 240, height: 240 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F97316', // brand orange background
    alignItems: 'center',
    justifyContent: 'center',
  },
});