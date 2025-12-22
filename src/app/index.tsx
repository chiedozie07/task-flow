import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

// enable LayoutAnimation on Android if needed 
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental?.(true);
// };
// // helper to animate layout changes (Call animateLayout() before state updates that change list lengths etc)
// export const animateLayout = () => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

// keep splash visible while we animate
SplashScreen.preventAutoHideAsync().catch(() => { });

export default function SplashScreenPage() {
  const router = useRouter();
  const opacity = new Animated.Value(1);
  const animation = useRef(null);

  // useEffect(() => {
  //   let mounted = true;
  //   const run = async () => {
  //     // show lottie for ~2.5s then fade and navigate
  //     await new Promise((r) => setTimeout(r, 2500));

  //     // fade out
  //     Animated.timing(opacity, {
  //       toValue: 0,
  //       duration: 3000,
  //       useNativeDriver: true,
  //     }).start(async () => {
  //       if (!mounted) return;
  //       await SplashScreen.hideAsync();
  //       // replace stack with tabs
  //       // router.replace('/(tabs)');
  //       router.replace('/home');
  //     });
  //   };
  //   run();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  const handleAnimationFinish = () => {
    // start the fade out
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(async () => {
      // hide the native splash screen ONLY after our custom animation is ready to disappear
      await SplashScreen.hideAsync();
      // move to the next screen
      router.replace('/home');
    });
  };

  return (
   <Animated.View style={[styles.container, { opacity }]}>
      <LottieView
        ref={animation}
        source={require('@/assets/lottie/splash.json')}
        autoPlay
        loop={false}
        // use the actual animation duration instead of a hardcoded 2500ms
        onAnimationFinish={handleAnimationFinish}
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