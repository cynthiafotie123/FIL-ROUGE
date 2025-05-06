// hooks/useDashboardAdmin.ts
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

type Stats = {
  totalProducts: number;
  totalOrders: number;
  totalPharmacies: number;
  revenue: number;
};

type Order = {
  id: string;
  product: string;
  customer: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  amount: number;
};

type Notification = {
  type: 'order' | 'user' | 'system';
  title: string;
  message: string;
  time: string;
};

const useDashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalPharmacies: 0,
    revenue: 0
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setStats(response.data.stats);
        setRecentOrders(response.data.recentOrders || []);
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    setIsProfileDropdownOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return {
    activeTab,
    searchTerm,
    setSearchTerm,
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
    dropdownRef,
    stats,
    recentOrders,
    notifications,
    handleProfileOptionClick,
    formatCurrency
  };
};

export default useDashboardAdmin;