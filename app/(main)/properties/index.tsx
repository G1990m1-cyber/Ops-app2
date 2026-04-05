import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';
import { Property } from '../../../types';

const TYPES: Property['type'][] = ['cottage', 'lodge', 'villa', 'apartment', 'barn'];

const TYPE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  cottage: 'home-outline',
  lodge: 'business-outline',
  villa: 'home',
  apartment: 'layers-outline',
  barn: 'construct-outline',
};

export default function PropertiesScreen() {
  const insets = useSafeAreaInsets();
  const { properties, addProperty, updateProperty } = useAppContext();
  const [showAdd, setShowAdd] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [form, setForm] = useState({ name: '', address: '', bedrooms: '4', maxGuests: '8', type: 'cottage' as Property['type'], notes: '' });

  function resetForm() {
    setForm({ name: '', address: '', bedrooms: '4', maxGuests: '8', type: 'cottage', notes: '' });
  }

  function openEdit(p: Property) {
    setEditingProperty(p);
    setForm({ name: p.name, address: p.address, bedrooms: String(p.bedrooms), maxGuests: String(p.maxGuests), type: p.type, notes: p.notes ?? '' });
    setShowAdd(true);
  }

  function handleSave() {
    if (!form.name.trim()) { Alert.alert('Required', 'Property name is required.'); return; }
    if (editingProperty) {
      updateProperty({ ...editingProperty, ...form, bedrooms: parseInt(form.bedrooms) || 0, maxGuests: parseInt(form.maxGuests) || 0 });
    } else {
      addProperty({
        id: `p_${Date.now()}`,
        name: form.name.trim(),
        address: form.address.trim(),
        bedrooms: parseInt(form.bedrooms) || 0,
        maxGuests: parseInt(form.maxGuests) || 0,
        type: form.type,
        active: true,
        notes: form.notes.trim(),
      });
    }
    setShowAdd(false);
    setEditingProperty(null);
    resetForm();
  }

  function toggleActive(p: Property) {
    updateProperty({ ...p, active: !p.active });
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Properties" showBack />
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, gap: 10, paddingBottom: insets.bottom + 32 }}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addBtn} onPress={() => { resetForm(); setEditingProperty(null); setShowAdd(true); }}>
            <Ionicons name="add-circle-outline" size={20} color={Colors.white} />
            <Text style={styles.addBtnText}>Add Property</Text>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, !item.active && styles.cardInactive]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconCircle, { backgroundColor: Colors.primary + '18' }]}>
                <Ionicons name={TYPE_ICONS[item.type] ?? 'home-outline'} size={22} color={Colors.primary} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.propertyName}>{item.name}</Text>
                <Text style={styles.address} numberOfLines={1}>{item.address}</Text>
                <Text style={styles.specs}>{item.bedrooms} bed · max {item.maxGuests} guests · {item.type}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => openEdit(item)} style={styles.actionBtn}>
                  <Ionicons name="pencil-outline" size={18} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleActive(item)} style={styles.actionBtn}>
                  <Ionicons name={item.active ? 'toggle' : 'toggle-outline'} size={22} color={item.active ? Colors.success : Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
            {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No properties found.</Text>}
      />

      <Modal visible={showAdd} transparent animationType="slide" onRequestClose={() => setShowAdd(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowAdd(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{editingProperty ? 'Edit Property' : 'Add Property'}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {[
                { label: 'Name *', key: 'name', placeholder: 'e.g. The Old Barn' },
                { label: 'Address', key: 'address', placeholder: 'Full address' },
                { label: 'Bedrooms', key: 'bedrooms', placeholder: '4', kb: 'numeric' as const },
                { label: 'Max Guests', key: 'maxGuests', placeholder: '8', kb: 'numeric' as const },
                { label: 'Notes', key: 'notes', placeholder: 'Optional notes' },
              ].map(({ label, key, placeholder, kb }) => (
                <View key={key} style={styles.field}>
                  <Text style={styles.fieldLabel}>{label}</Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={(form as any)[key]}
                    onChangeText={(v) => setForm((f) => ({ ...f, [key]: v }))}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textMuted}
                    keyboardType={kb}
                  />
                </View>
              ))}
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Type</Text>
                <View style={styles.chipRow}>
                  {TYPES.map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[styles.chip, form.type === t && styles.chipActive]}
                      onPress={() => setForm((f) => ({ ...f, type: t }))}
                    >
                      <Text style={[styles.chipText, form.type === t && styles.chipTextActive]}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{editingProperty ? 'Save Changes' : 'Add Property'}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primary, borderRadius: 10, padding: 12, gap: 8, marginBottom: 4,
  },
  addBtnText: { color: Colors.white, fontWeight: '600', fontSize: 14 },
  card: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  cardInactive: { opacity: 0.6 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  iconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1 },
  propertyName: { fontSize: 16, fontWeight: '700', color: Colors.text },
  address: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  specs: { fontSize: 12, color: Colors.textMuted, marginTop: 4, textTransform: 'capitalize' },
  actions: { flexDirection: 'row', gap: 4 },
  actionBtn: { padding: 6 },
  notes: { fontSize: 12, color: Colors.textSecondary, marginTop: 8, fontStyle: 'italic', borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 8 },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40, fontSize: 15 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, maxHeight: '85%',
  },
  sheetHandle: { width: 40, height: 4, backgroundColor: Colors.border, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  field: { marginBottom: 14 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 6 },
  fieldInput: {
    backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.inputBorder,
    borderRadius: 10, padding: 12, fontSize: 14, color: Colors.text,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: Colors.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, color: Colors.text, textTransform: 'capitalize' },
  chipTextActive: { color: Colors.white, fontWeight: '600' },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
});
