import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../src/consts/colors';
import Setting from './Setting'
import VALUES from '../src/consts/value';
import AdNewFoodOrder from './AdNewFoodOrder';
import AdNewGoodOrder from './AdNewGoodOrder';
import Manager from './Manager';
import AdNewServiceOrder from './AdNewServiceOrder';
import { Context } from '../App';

const Tab = createBottomTabNavigator();

const AdTabBar = () => {

  const { setNewFoodOrderCount, setNewGoodOrderCount, setNewServiceOrderCount } = useContext(Context)
  const { newFoodOrderCount, newGoodOrderCount, newServiceOrderCount } = useContext(Context)
  const { orders, ordersService } = useContext(Context)

  useEffect(() => {
    setNewFoodOrderCount(orders.filter(order => order.status == 'pendding' && order.type == 'food').length)
    setNewGoodOrderCount(orders.filter(order => order.status == 'pendding' && order.type == 'good').length)
    setNewServiceOrderCount(ordersService.filter(order => order.status == 'pendding').length)
  }, [orders, ordersService])

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        activeTintColor: COLORS.primary,
        labelStyle: {
          fontSize: VALUES.textTab,
        }
      }}>



      <Tab.Screen
        name="Đơn food"
        component={AdNewFoodOrder}
        options={{
          tabBarBadge: newFoodOrderCount > 0 ? newFoodOrderCount : null,
          tabBarIcon: ({ color }) => (
            <Icon name="fastfood" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Đơn good"
        component={AdNewGoodOrder}
        options={{
          tabBarBadge: newGoodOrderCount > 0 ? newGoodOrderCount : null,
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Đơn service"
        component={AdNewServiceOrder}
        options={{
          tabBarBadge: newServiceOrderCount > 0 ? newServiceOrderCount : null,
          tabBarIcon: ({ color }) => (
            <Icon name="construction" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Quản lý"
        component={Manager}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="edit" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Cài Đặt"
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="settings" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdTabBar;
