import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Alert ,FlatList, TouchableOpacity } from 'react-native';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BackField, TextPlate,Confirm ,PrimaryButton,SettingField} from '../Components';
import { Context } from '../App';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';



const HistoryPlate = ({ order, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row', alignItems: 'center', borderWidth: 0.5,
                borderColor: 'grey',
                borderRadius: VALUES.commonRadius,
                paddingHorizontal: 10,
                paddingVertical: 5,
            }}>
            <Icon name='fastfood' size={20} />
            <Text style={{ fontSize: VALUES.textContent }}>{order.id}</Text>
        </TouchableOpacity>
    )
}




const ManagerUserDetail = ({ navigation, route }) => {
    const [user, setUser] = useState(route.params)
    const { orders, currentUser, system } = useContext(Context)


    function CheckUser() {
        let check = user.name.length > 5 && user.address.length > 5 && user.index >= 0 &&
            user.point >= 0 && system.userType.includes(user.role)
        return check
    }

    const Save = () => {
        if (CheckUser()) {
            try {
                setDoc(doc(db, 'users', user.id.toString()), user)
            } catch { }
        } else {
            alert('invalid data')
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: VALUES.commonMargin }}>
                <BackField text='<' navigation={navigation} />
                <Text style={{ flex: 1, fontSize: VALUES.textH2, textAlign: 'center' }}>ID:{user.id}</Text>

            </View>
            {/* onChangeText={text => setItem({ ...item, name: text })} */}
            <TextPlate onChangeText={text => setUser({ ...user, name: text })} title={'Name'} input={user.name} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate title={'Phone'} input={user.phone.toString()} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate onChangeText={text => setUser({ ...user, address: text })} title={'Address'} input={user.address} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate onChangeText={text => setUser({ ...user, role: text })} title={'Role'} input={user.role} note={'User/Shop/Manager/Admin'} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate onChangeText={text => setUser({ ...user, power: text })} title={'Power'} input={user.power} note={'User/Shop/Manager/Admin'} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <TextPlate onChangeText={text => setUser({ ...user, point: Number(text) })} title={'Point'} input={user.point.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate onChangeText={text => setUser({ ...user, shopName: text })} title={'ShopName'} input={user.shopName} styleEx={{ flex: 2, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextPlate onChangeText={text => setUser({ ...user, index: Number(text) })} title={'index'} input={user.index.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate title={'pass'} input={user.password} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            </View>



            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: VALUES.commonMargin, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: VALUES.textContent }}>History</Text>

            </View>

            {/* History */}
            <View style={{ marginHorizontal: VALUES.commonMargin, height: 200 }}>
                <FlatList
                    numColumns={3}
                    columnWrapperStyle={{ alignItems: 'flex-start' }}
                    data={orders.filter(order => order.user.id == currentUser.id)}
                    renderItem={({ item }) => <HistoryPlate order={item} onPress={() => navigation.navigate('OrderDetailAdmin', item)} />}
                />
            </View>

            {/* Báo cáo tài chính */}
            <SettingField content={'Báo cáo tài chính'} />
            <PrimaryButton onPress={() => Confirm('Update User?', () => Save())} styleEx={{ marginVertical: 15 }} title='Save' />
        </SafeAreaView>
    )
}
export default ManagerUserDetail;
