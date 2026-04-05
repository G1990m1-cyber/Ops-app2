import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Property,
  User,
  ActionItem,
  StocktakeItem,
  StocktakeEntry,
  Booking,
  PreCheckIn,
  PostCheckOut,
  WeeklyCheck,
  MonthlyCheck,
  Approval,
  WorkTicket,
} from '../types';
import {
  MOCK_PROPERTIES,
  MOCK_USERS,
  MOCK_ACTION_ITEMS,
  MOCK_STOCKTAKE_ITEMS,
  MOCK_STOCKTAKE_ENTRIES,
  MOCK_BOOKINGS,
  MOCK_PRE_CHECKINS,
  MOCK_POST_CHECKOUTS,
  MOCK_WEEKLY_CHECKS,
  MOCK_MONTHLY_CHECKS,
  MOCK_APPROVALS,
  MOCK_WORK_TICKETS,
} from '../constants/mockData';

interface AppContextType {
  properties: Property[];
  users: User[];
  actionItems: ActionItem[];
  stocktakeItems: StocktakeItem[];
  stocktakeEntries: StocktakeEntry[];
  bookings: Booking[];
  preCheckIns: PreCheckIn[];
  postCheckOuts: PostCheckOut[];
  weeklyChecks: WeeklyCheck[];
  monthlyChecks: MonthlyCheck[];
  approvals: Approval[];
  workTickets: WorkTicket[];
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;

  // Mutators
  addActionItem: (item: ActionItem) => void;
  updateActionItem: (item: ActionItem) => void;
  addApproval: (approval: Approval) => void;
  updateApproval: (approval: Approval) => void;
  updatePreCheckIn: (pci: PreCheckIn) => void;
  updatePostCheckOut: (pco: PostCheckOut) => void;
  updateWeeklyCheck: (wc: WeeklyCheck) => void;
  updateMonthlyCheck: (mc: MonthlyCheck) => void;
  addStocktakeEntry: (entry: StocktakeEntry) => void;
  updateWorkTicket: (wt: WorkTicket) => void;
  addWorkTicket: (wt: WorkTicket) => void;
  addProperty: (p: Property) => void;
  updateProperty: (p: Property) => void;
  addUser: (u: User) => void;
  updateUser: (u: User) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const STORAGE_KEYS = {
  properties: '@ops_properties',
  users: '@ops_users',
  actionItems: '@ops_action_items',
  stocktakeEntries: '@ops_stocktake_entries',
  preCheckIns: '@ops_pre_checkins',
  postCheckOuts: '@ops_post_checkouts',
  weeklyChecks: '@ops_weekly_checks',
  monthlyChecks: '@ops_monthly_checks',
  approvals: '@ops_approvals',
  workTickets: '@ops_work_tickets',
};

async function loadOrDefault<T>(key: string, defaultVal: T): Promise<T> {
  try {
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultVal;
  } catch {
    return defaultVal;
  }
}

async function persist(key: string, value: unknown) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Persist error', key, e);
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [stocktakeItems] = useState<StocktakeItem[]>(MOCK_STOCKTAKE_ITEMS);
  const [stocktakeEntries, setStocktakeEntries] = useState<StocktakeEntry[]>([]);
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [preCheckIns, setPreCheckIns] = useState<PreCheckIn[]>([]);
  const [postCheckOuts, setPostCheckOuts] = useState<PostCheckOut[]>([]);
  const [weeklyChecks, setWeeklyChecks] = useState<WeeklyCheck[]>([]);
  const [monthlyChecks, setMonthlyChecks] = useState<MonthlyCheck[]>([]);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [workTickets, setWorkTickets] = useState<WorkTicket[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  useEffect(() => {
    initData();
  }, []);

  async function initData() {
    const [
      props, usrs, ais, ses, pcis, pcos, wcs, mcs, aps, wts,
    ] = await Promise.all([
      loadOrDefault(STORAGE_KEYS.properties, MOCK_PROPERTIES),
      loadOrDefault(STORAGE_KEYS.users, MOCK_USERS),
      loadOrDefault(STORAGE_KEYS.actionItems, MOCK_ACTION_ITEMS),
      loadOrDefault(STORAGE_KEYS.stocktakeEntries, MOCK_STOCKTAKE_ENTRIES),
      loadOrDefault(STORAGE_KEYS.preCheckIns, MOCK_PRE_CHECKINS),
      loadOrDefault(STORAGE_KEYS.postCheckOuts, MOCK_POST_CHECKOUTS),
      loadOrDefault(STORAGE_KEYS.weeklyChecks, MOCK_WEEKLY_CHECKS),
      loadOrDefault(STORAGE_KEYS.monthlyChecks, MOCK_MONTHLY_CHECKS),
      loadOrDefault(STORAGE_KEYS.approvals, MOCK_APPROVALS),
      loadOrDefault(STORAGE_KEYS.workTickets, MOCK_WORK_TICKETS),
    ]);
    setProperties(props);
    setUsers(usrs);
    setActionItems(ais);
    setStocktakeEntries(ses);
    setPreCheckIns(pcis);
    setPostCheckOuts(pcos);
    setWeeklyChecks(wcs);
    setMonthlyChecks(mcs);
    setApprovals(aps);
    setWorkTickets(wts);
  }

  function addActionItem(item: ActionItem) {
    setActionItems((prev) => {
      const next = [item, ...prev];
      persist(STORAGE_KEYS.actionItems, next);
      return next;
    });
  }

  function updateActionItem(item: ActionItem) {
    setActionItems((prev) => {
      const next = prev.map((i) => (i.id === item.id ? item : i));
      persist(STORAGE_KEYS.actionItems, next);
      return next;
    });
  }

  function addApproval(approval: Approval) {
    setApprovals((prev) => {
      const next = [approval, ...prev];
      persist(STORAGE_KEYS.approvals, next);
      return next;
    });
  }

  function updateApproval(approval: Approval) {
    setApprovals((prev) => {
      const next = prev.map((a) => (a.id === approval.id ? approval : a));
      persist(STORAGE_KEYS.approvals, next);
      return next;
    });
  }

  function updatePreCheckIn(pci: PreCheckIn) {
    setPreCheckIns((prev) => {
      const next = prev.map((i) => (i.id === pci.id ? pci : i));
      persist(STORAGE_KEYS.preCheckIns, next);
      return next;
    });
  }

  function updatePostCheckOut(pco: PostCheckOut) {
    setPostCheckOuts((prev) => {
      const next = prev.map((i) => (i.id === pco.id ? pco : i));
      persist(STORAGE_KEYS.postCheckOuts, next);
      return next;
    });
  }

  function updateWeeklyCheck(wc: WeeklyCheck) {
    setWeeklyChecks((prev) => {
      const next = prev.map((i) => (i.id === wc.id ? wc : i));
      persist(STORAGE_KEYS.weeklyChecks, next);
      return next;
    });
  }

  function updateMonthlyCheck(mc: MonthlyCheck) {
    setMonthlyChecks((prev) => {
      const next = prev.map((i) => (i.id === mc.id ? mc : i));
      persist(STORAGE_KEYS.monthlyChecks, next);
      return next;
    });
  }

  function addStocktakeEntry(entry: StocktakeEntry) {
    setStocktakeEntries((prev) => {
      const next = [entry, ...prev];
      persist(STORAGE_KEYS.stocktakeEntries, next);
      return next;
    });
  }

  function updateWorkTicket(wt: WorkTicket) {
    setWorkTickets((prev) => {
      const next = prev.map((i) => (i.id === wt.id ? wt : i));
      persist(STORAGE_KEYS.workTickets, next);
      return next;
    });
  }

  function addWorkTicket(wt: WorkTicket) {
    setWorkTickets((prev) => {
      const next = [wt, ...prev];
      persist(STORAGE_KEYS.workTickets, next);
      return next;
    });
  }

  function addProperty(p: Property) {
    setProperties((prev) => {
      const next = [...prev, p];
      persist(STORAGE_KEYS.properties, next);
      return next;
    });
  }

  function updateProperty(p: Property) {
    setProperties((prev) => {
      const next = prev.map((i) => (i.id === p.id ? p : i));
      persist(STORAGE_KEYS.properties, next);
      return next;
    });
  }

  function addUser(u: User) {
    setUsers((prev) => {
      const next = [...prev, u];
      persist(STORAGE_KEYS.users, next);
      return next;
    });
  }

  function updateUser(u: User) {
    setUsers((prev) => {
      const next = prev.map((i) => (i.id === u.id ? u : i));
      persist(STORAGE_KEYS.users, next);
      return next;
    });
  }

  return (
    <AppContext.Provider
      value={{
        properties,
        users,
        actionItems,
        stocktakeItems,
        stocktakeEntries,
        bookings,
        preCheckIns,
        postCheckOuts,
        weeklyChecks,
        monthlyChecks,
        approvals,
        workTickets,
        selectedPropertyId,
        setSelectedPropertyId,
        addActionItem,
        updateActionItem,
        addApproval,
        updateApproval,
        updatePreCheckIn,
        updatePostCheckOut,
        updateWeeklyCheck,
        updateMonthlyCheck,
        addStocktakeEntry,
        updateWorkTicket,
        addWorkTicket,
        addProperty,
        updateProperty,
        addUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
