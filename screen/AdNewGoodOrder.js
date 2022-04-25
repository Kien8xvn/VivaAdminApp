import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import COLORS from '../src/consts/colors';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../App';
import { statusMap, NewOrderFlatlist, SearchField } from '../Components';




const AdNewGoodOrder = ({ navigation }) => {
    const { orders, currentUser } = useContext(Context)
    const [select, setSelect] = useState('')
    const [searchKey, setSearchKey] = useState('')


    function FilterOrder() {
        let tempOrders = orders.filter(order => order.status.includes(select) && order.type == 'good')
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
                renderItem={({ item }) => <NewOrderFlatlist order={item} onPress={() => {
                    if (currentUser.power.includes('good') || currentUser.role == 'admin') {
                        navigation.navigate('AdOrderDetail', item)
                    } else {
                        alert('not register good')
                    }
                }} />}
            />
        </SafeAreaView>
    )
}
export default AdNewGoodOrder;


