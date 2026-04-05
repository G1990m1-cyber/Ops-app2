import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { Property } from '../types';
import { useAppContext } from '../context/AppContext';

interface PropertySelectorProps {
  properties?: Property[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  placeholder?: string;
  allowAll?: boolean;
}

export default function PropertySelector({
  properties: propsProp,
  selectedId,
  onSelect,
  placeholder = 'Select property…',
  allowAll = true,
}: PropertySelectorProps) {
  const [open, setOpen] = useState(false);
  const ctx = useAppContext();
  const properties = propsProp ?? ctx.properties;

  const selected = properties.find((p) => p.id === selectedId);

  const items = allowAll
    ? [{ id: null, name: 'All Properties' }, ...properties.filter((p) => p.active)]
    : properties.filter((p) => p.active);

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={() => setOpen(true)}>
        <Ionicons name="business-outline" size={16} color={Colors.primary} style={styles.icon} />
        <Text style={[styles.selectorText, !selected && styles.placeholder]}>
          {selected ? selected.name : allowAll ? 'All Properties' : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Select Property</Text>
            <FlatList
              data={items as Array<{ id: string | null; name: string }>}
              keyExtractor={(item) => item.id ?? 'all'}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedId === item.id && styles.optionSelected,
                  ]}
                  onPress={() => {
                    onSelect(item.id);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedId === item.id && styles.optionTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                  {selectedId === item.id && (
                    <Ionicons name="checkmark" size={18} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  selectorText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  placeholder: {
    color: Colors.textMuted,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modal: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 8,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: Colors.background,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
});
