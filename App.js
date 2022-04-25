import React, { useState, createContext } from 'react';
import COLORS from './src/consts/colors';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './screen/Loading';
import Login from './screen/Login';
import Register from './screen/Register';
import SkipLogin from './screen/SkipLogin';
import Policy from './screen/Policy';
import AdTabBar from './screen/AdTabBar';
import UserInfo from './screen/UserInfo';
import AdOrderDetail from './screen/AdOrderDetail';
import AdServiceOrderDetail from './screen/AdServiceOrderDetail';
import ItemListForAdd from './screen/ItemListForAdd';
import ManagerUser from './screen/ManagerUser';
import ManagerItem from './screen/ManagerItem';
import ManagerService from './screen/ManagerService';
import ManagerPromo from './screen/ManagerPromo';
import ManagerUserDetail from './screen/ManagerUserDetail';
import ManagerItemDetail from './screen/ManagerItemDetail';
import ManagerServiceDetail from './screen/ManagerServiceDetail';
import ManagerPromoDetail from './screen/ManagerPromoDetail';
import UserListForAdd from './screen/UserListForAdd';
import Welcome from './screen/Welcome';
import NotifAll from './screen/NotifAll';



export const Context = createContext();

const Stack = createNativeStackNavigator();

export default App = () => {
  const defaultUser = {
    name: 'BillGate',
  }
  const defaultOrder = {
    orderItems: [
    ],
    promo: 0,
    shipType: 'normal',
    value: {
      ship: 0,
      totalItems: 0,
      promo: 0,
      total: 0
    }
  }
  const [expoToken, setExpoToken] = useState('none')
  const [services, setServices] = useState([])
  const [system, setSystem] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [items, setItems] = useState([])
  const [promos, setPromos] = useState([])
  const [activePromo, setActivePromo] = useState(null)
  const [itemType, setItemType] = useState([])
  const [shops, setShops] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({ name: 'test' })
  const [foodCart, setFoodCart] = useState([])
  const [goodCart, setGoodCart] = useState([])
  const [orders, setOrders] = useState([])
  const [ordersService, setOrdersService] = useState([])
  const [lastScreenIs, setLastScreenIs] = useState('food')
  const [ship, setShip] = useState('normal')
  const [value, setValue] = useState({ ship: 0, promo: 0, items: 0, total: 0 })
  const [newOrderCount, setNewOrderCount] = useState(0)
  const [newFoodOrderCount, setNewFoodOrderCount] = useState(0)
  const [newGoodOrderCount, setNewGoodOrderCount] = useState(0)
  const [newServiceOrderCount, setNewServiceOrderCount] = useState(0)


  return (
    <Context.Provider value={{
      isSignedIn, setIsSignedIn,
      currentUser, setCurrentUser,
      orders, setOrders,
      ordersService, setOrdersService,
      items, setItems,
      promos, setPromos,
      system, setSystem,
      itemType, setItemType,
      shops, setShops,
      lastScreenIs, setLastScreenIs,
      activePromo, setActivePromo,
      ship, setShip,
      isConnected, setIsConnected,
      foodCart, setFoodCart,
      goodCart, setGoodCart,
      value, setValue,
      users, setUsers,
      newOrderCount, setNewOrderCount,
      services, setServices,
      newFoodOrderCount, setNewFoodOrderCount,
      newGoodOrderCount, setNewGoodOrderCount,
      newServiceOrderCount, setNewServiceOrderCount,
      expoToken, setExpoToken
    }}>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="SkipLogin" component={SkipLogin} />
          <Stack.Screen name="Policy" component={Policy} />
          <Stack.Screen name="Home" component={AdTabBar} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="AdOrderDetail" component={AdOrderDetail} />
          <Stack.Screen name="AdServiceOrderDetail" component={AdServiceOrderDetail} />
          <Stack.Screen name="ItemListForAdd" component={ItemListForAdd} />
          <Stack.Screen name="ManagerUser" component={ManagerUser} />
          <Stack.Screen name="ManagerItem" component={ManagerItem} />
          <Stack.Screen name="ManagerService" component={ManagerService} />
          <Stack.Screen name="ManagerPromo" component={ManagerPromo} />
          <Stack.Screen name="ManagerUserDetail" component={ManagerUserDetail} />
          <Stack.Screen name="ManagerItemDetail" component={ManagerItemDetail} />
          <Stack.Screen name="ManagerServiceDetail" component={ManagerServiceDetail} />
          <Stack.Screen name="ManagerPromoDetail" component={ManagerPromoDetail} />
          <Stack.Screen name="UserListForAdd" component={UserListForAdd} />
          <Stack.Screen name="NotifAll" component={NotifAll} />

        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>

  );
};

