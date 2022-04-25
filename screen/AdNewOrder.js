import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import COLORS from '../src/consts/colors';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../App';
import { statusMap, NewOrderFlatlist, SearchField } from '../Components';


const AdNewOrder = ({ navigation }) => { ///Main
    const { orders, currentUser, ordersService } = useContext(Context)
    const [selectType, setSelectType] = useState('')
    const [selectStatus, setSelectStatus] = useState('')
    const [searchKey, setSearchKey] = useState('')

    function FilterOrder() {
        let tempOrders = []
        if (selectType == 'service') {
            tempOrders = [...ordersService]
            return tempOrders.filter(order => JSON.stringify(order).includes(searchKey))
        }
        tempOrders = orders.filter(order => order.status.includes(selectStatus) && order.type.includes(selectType))
        return tempOrders.filter(order => JSON.stringify(order).includes(searchKey))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Search field */}
            <SearchField searchFunction={text => setSearchKey(text)} styleEx={{
                marginHorizontal: VALUES.commonMargin,
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: VALUES.borderWidth,
                borderColor: 'grey',
                borderRadius: VALUES.inputRadius,
            }} />

            {/* Filter type */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10
            }}>
                <TouchableOpacity onPress={() => setSelectType('')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectType == '' ? 'red' : 'black'
                    }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectType('food')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectType == 'food' ? 'red' : 'black'
                    }}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectType('good')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectType == 'good' ? 'red' : 'black'
                    }}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectType('service')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectType == 'service' ? 'red' : 'black'
                    }}>Service</Text>
                </TouchableOpacity>

            </View>

            {/* Filter status */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 5
            }}>
                <TouchableOpacity onPress={() => setSelectStatus('')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectStatus == '' ? 'red' : 'black'
                    }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectStatus('pendding')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectStatus == 'pendding' ? 'red' : 'black'
                    }}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectStatus('accept')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectStatus == 'accept' ? 'red' : 'black'
                    }}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectStatus('finish')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectStatus == 'finish' ? 'red' : 'black'
                    }}>Finish</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectStatus('cancel')}>
                    <Text style={{
                        fontSize: VALUES.textContent,
                        color: selectStatus == 'cancel' ? 'red' : 'black'
                    }}>Cancel</Text>
                </TouchableOpacity>

            </View>
            {/* OrderList */}
            <FlatList
                data={FilterOrder()}
                renderItem={({ item }) => <NewOrderFlatlist order={item} onPress={() => navigation.navigate('AdOrderDetail', { order: item, role: 'admin' })} />}
            />
        </SafeAreaView>
    )
}
export default AdNewOrder;

