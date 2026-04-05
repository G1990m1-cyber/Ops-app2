import { Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../../constants/colors';

export default function MainLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="action-items/index" />
      <Stack.Screen name="action-items/[id]" />
      <Stack.Screen name="action-items/add" />
      <Stack.Screen name="stocktake/index" />
      <Stack.Screen name="stocktake/[type]" />
      <Stack.Screen name="pre-checkin/index" />
      <Stack.Screen name="pre-checkin/[id]" />
      <Stack.Screen name="post-checkout/index" />
      <Stack.Screen name="post-checkout/[id]" />
      <Stack.Screen name="weekly-checks/index" />
      <Stack.Screen name="weekly-checks/[id]" />
      <Stack.Screen name="monthly-checks/index" />
      <Stack.Screen name="monthly-checks/[id]" />
      <Stack.Screen name="approvals/index" />
      <Stack.Screen name="approvals/[id]" />
      <Stack.Screen name="approvals/add" />
      <Stack.Screen name="properties/index" />
      <Stack.Screen name="admin/index" />
      <Stack.Screen name="admin/users" />
      <Stack.Screen name="dashboard/index" />
      <Stack.Screen name="work-tickets/index" />
      <Stack.Screen name="work-tickets/[id]" />
    </Stack>
  );
}
