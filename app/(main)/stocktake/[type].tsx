import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';

export default function StocktakeItemsScreen() {
  const { type } = useLocalSearchParams<{ type: 'shelf' | 'cleaning' }>();
  const router = useRouter();
  const { stocktakeItems, addStocktakeEntry, stocktakeEntries } = useAppContext();
  const { user } = useAuth();

  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  const isShelf = type === 'shelf';
  const title = isShelf ? 'Stocktake - Items on the Shelf' : 'Stocktake - Cleaning Products';

  const items = useMemo(
    () => stocktakeItems.filter((i) => i.category === (isShelf ? 'shelf' : 'cleaning')),
    [stocktakeItems, isShelf]
  );

  function setQty(id: string, val: string) {
    setQuantities((prev) => ({ ...prev, [id]: val }));
  }

  function submit() {
    if (!propertyId) { Alert.alert('Required', 'Please select a property.'); return; }
    const entryItems = items.map((i) => ({
      itemId: i.id,
      quantity: parseInt(quantities[i.id] ?? '0', 10) || 0,
    }));
    addStocktakeEntry({
      id: `se_${Date.now()}`,
      propertyId,
      date: new Date().toISOString().split('T')[0],
      submittedBy: user?.id ?? '',
      items: entryItems,
      status: 'submitted',
    });
    Alert.alert('Submitted', 'Stocktake saved.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  return (
    <View style={styles.container}>
      <AppHeader title={title} showBack />
      <View style={{ padding: 12 }}>
        <PropertySelector selectedId={propertyId} onSelect={setPropertyId} allowAll={false} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100 }}
        renderItem={({ item, index }) => (
          <View style={[styles.row, index % 2 === 0 && styles.rowShaded]}>
            <Text style={styles.rowLabel}>{item.name}</Text>
            <TextInput
              style={styles.qtyInput}
              value={quantities[item.id] ?? ''}
              onChangeText={(v) => setQty(item.id, v)}
              keyboardType="number-pad"
              placeholder="0"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  rowShaded: { backgroundColor: '#F7F3EA' },
  rowLabel: { flex: 1, fontSize: 14, color: Colors.text },
  qtyInput: {
    width: 70, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, textAlign: 'center',
    fontSize: 14, color: Colors.text,
  },
  footer: {
    flexDirection: 'row', gap: 12, padding: 16,
    backgroundColor: Colors.background,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  submitBtn: {
    flex: 1, backgroundColor: Colors.primary, borderRadius: 10, padding: 14, alignItems: 'center',
  },
  submitBtnText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  cancelBtn: {
    flex: 1, backgroundColor: Colors.text, borderRadius: 10, padding: 14, alignItems: 'center',
  },
  cancelBtnText: { color: Colors.white, fontWeight: '600', fontSize: 15 },
});
