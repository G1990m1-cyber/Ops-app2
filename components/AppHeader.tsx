import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import { useAuth } from '../context/AuthContext';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showHome?: boolean;
  rightAction?: { icon: keyof typeof Ionicons.glyphMap; onPress: () => void };
}

export default function AppHeader({
  title,
  showBack = false,
  showHome = true,
  rightAction,
}: AppHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const paddingTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 8 : insets.top + 8;

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.inner}>
        {/* Left side */}
        <View style={styles.side}>
          {showBack && (
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>
          )}
          {showHome && !showBack && (
            <TouchableOpacity onPress={() => router.push('/(main)/home')} style={styles.iconBtn}>
              <Ionicons name="home-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Right side */}
        <View style={styles.side}>
          {rightAction ? (
            <TouchableOpacity onPress={rightAction.onPress} style={styles.iconBtn}>
              <Ionicons name={rightAction.icon} size={24} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => router.push('/(main)/home')}
              style={[styles.iconBtn, styles.userBtn]}
            >
              <Ionicons name="person-circle-outline" size={26} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingBottom: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  side: {
    width: 44,
    alignItems: 'center',
  },
  iconBtn: {
    padding: 4,
  },
  userBtn: {},
  title: {
    flex: 1,
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 8,
  },
});
