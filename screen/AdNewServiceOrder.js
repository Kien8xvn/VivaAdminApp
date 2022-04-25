import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import COLORS from '../src/consts/colors';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../App';
import { statusMap, SearchField } from '../Components';



const AdNewServiceOrder = ({ navigation }) => {
    const { ordersService, currentUser } = useContext(Context)
    const [select, setSelect] = useState('')
    const [searchKey, setSearchKey] = useState('')


    function FilterOrder() {
        let tempOrders = ordersService.filter(order => order.status.includes(select))
        return tempOrders.filter(order => JSON.stringify(order).includes(searchKey))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchField searchFunction={text => setSearchKey(text)} styleEx={{
                marginHorizontal: VALUES.commonMargin,
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: VALUES.borderWidth,
                borderColor: 'grey',
                borderRadius: VALUES.inputRadius,
            }} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <TouchableOpacity onPress={() => { setSelect('') }}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: select == '' ? 'red' : 'black'
                    }}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect('pendding') }}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: select == 'pendding' ? 'red' : 'black'
                    }}>Mới</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect('accept') }}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: select == 'accept' ? 'red' : 'black'
                    }}>Đã nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect('finish') }}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: select == 'finish' ? 'red' : 'black'
                    }}>Hoàn thành</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect('cancel') }}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: select == 'cancel' ? 'red' : 'black'
                    }}>Huỷ</Text>
                </TouchableOpacity>

            </View>
            <FlatList
                data={FilterOrder()}
                renderItem={({ item }) => <NewServiceOrderFlatlist order={item} onPress={() => {
                    if (currentUser.power.includes(item.service.name) || currentUser.role == 'admin') {
                        navigation.navigate('AdServiceOrderDetail', item)
                    } else {
                        alert('not register this service')
                    }
                }} />}
            />
        </SafeAreaView>
    )
}
export default AdNewServiceOrder;


const NewServiceOrderFlatlist = ({ order, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{
                flexDirection: 'row',
                marginHorizontal: VALUES.commonMargin,
                marginVertical: 5,
                borderWidth: VALUES.borderWidth,
                borderColor: 'grey',
                borderRadius: VALUES.commonRadius,
            }}>
                <View style={{ margin: 10 }}>
                    <Icon name={'construction'} size={80} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1, marginLeft: 5, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                        <Text style={{ color: 'red', fontSize: VALUES.textH2 }}>{order.value.total}k</Text>
                        <Text style={{ color: 'blue', fontSize: VALUES.textContent }}>{statusMap.find(i => i.key == order.status).value}</Text>
                    </View>
                    {/* Shipper info */}
                    <Text style={{ fontSize: VALUES.textH2 }}>{order.service.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}