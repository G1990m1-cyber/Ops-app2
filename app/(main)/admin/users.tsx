import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';
import { User } from '../../../types';

const ROLES: User['role'][] = ['admin', 'manager', 'caretaker', 'cleaner'];
const ROLE_COLORS: Record<User['role'], string> = {
  admin: Colors.error,
  manager: Colors.warning,
  caretaker: Colors.info,
  cleaner: Colors.success,
};

export default function ManageUsersScreen() {
  const insets = useSafeAreaInsets();
  const { users, addUser, updateUser } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'caretaker' as User['role'] });

  function resetForm() {
    setForm({ name: '', email: '', phone: '', role: 'caretaker' });
  }

  function openEdit(u: User) {
    setEditingUser(u);
    setForm({ name: u.name, email: u.email, phone: u.phone ?? '', role: u.role });
    setShowForm(true);
  }

  function handleSave() {
    if (!form.name.trim()) { Alert.alert('Required', 'Name is required.'); return; }
    if (!form.email.trim()) { Alert.alert('Required', 'Email is required.'); return; }
    if (editingUser) {
      updateUser({ ...editingUser, ...form, phone: form.phone || undefined });
    } else {
      addUser({
        id: `u_${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        role: form.role,
        propertyIds: [],
        active: true,
        createdAt: new Date().toISOString(),
      });
    }
    setShowForm(false);
    setEditingUser(null);
    resetForm();
  }

  function toggleActive(u: User) {
    Alert.alert(u.active ? 'Deactivate User' : 'Activate User', `${u.active ? 'Deactivate' : 'Activate'} ${u.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', onPress: () => updateUser({ ...u, active: !u.active }) },
    ]);
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Manage Users" showBack />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, gap: 8, paddingBottom: insets.bottom + 32 }}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addBtn} onPress={() => { resetForm(); setEditingUser(null); setShowForm(true); }}>
            <Ionicons name="person-add-outline" size={18} color={Colors.white} />
            <Text style={styles.addBtnText}>Add User</Text>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, !item.active && styles.cardInactive]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={[styles.roleBadge, { backgroundColor: ROLE_COLORS[item.role] + '18' }]}>
                  <Text style={[styles.roleText, { color: ROLE_COLORS[item.role] }]}>{item.role}</Text>
                </View>
              </View>
              <Text style={styles.email}>{item.email}</Text>
              {item.phone && <Text style={styles.phone}>{item.phone}</Text>}
              {!item.active && <Text style={styles.inactive}>INACTIVE</Text>}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => openEdit(item)} style={styles.actionBtn}>
                <Ionicons name="pencil-outline" size={18} color={Colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleActive(item)} style={styles.actionBtn}>
                <Ionicons name={item.active ? 'person-outline' : 'person-add-outline'} size={18} color={item.active ? Colors.textMuted : Colors.success} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={showForm} transparent animationType="slide" onRequestClose={() => setShowForm(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowForm(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{editingUser ? 'Edit User' : 'Add User'}</Text>
            <ScrollView>
              {[
                { label: 'Full Name *', key: 'name', placeholder: 'Jane Smith' },
                { label: 'Email *', key: 'email', placeholder: 'jane@company.com', kb: 'email-address' as const },
                { label: 'Phone', key: 'phone', placeholder: '07700 000000', kb: 'phone-pad' as const },
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
                    autoCapitalize={key === 'email' ? 'none' : 'words'}
                  />
                </View>
              ))}
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Role</Text>
                <View style={styles.chipRow}>
                  {ROLES.map((r) => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.chip, form.role === r && styles.chipActive]}
                      onPress={() => setForm((f) => ({ ...f, role: r }))}
                    >
                      <Text style={[styles.chipText, form.role === r && styles.chipTextActive]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{editingUser ? 'Save Changes' : 'Add User'}</Text>
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
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: Colors.white, borderRadius: 12, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  cardInactive: { opacity: 0.6 },
  avatar: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.primary + '20',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  name: { fontSize: 15, fontWeight: '600', color: Colors.text },
  roleBadge: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  roleText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  email: { fontSize: 12, color: Colors.textSecondary },
  phone: { fontSize: 12, color: Colors.textMuted },
  inactive: { fontSize: 10, fontWeight: '700', color: Colors.error, marginTop: 4 },
  actions: { flexDirection: 'row', gap: 4 },
  actionBtn: { padding: 4 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, maxHeight: '75%',
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
