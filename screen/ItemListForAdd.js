import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image,FlatList } from 'react-native';
import COLORS from '../src/consts/colors';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Confirm, BackField, SearchField, PrimaryButton, CalculateOrderValue } from '../Components';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Context } from '../App';


const ItemListForAdd = ({ navigation, route }) => {
    const [order, setOrder] = useState(route.params.order)
    const { items, system, users } = useContext(Context)
    const [searchKey, setSearchKey] = useState('')


    const ItemFlatlist = ({ item }) => {
        const [count, setCount] = useState(0)
        function UpdateCart() {
            let tempItem = {
                ...item,
                count: count,
                userNote: '',
                shop: users.find(u => u.id == route.params.shopId),
                orderStatus: order.orderItems.find(i => i.shopId == route.params.shopId).orderStatus
            }
            let tempOrder = { ...order }
            tempOrder.orderItems = tempOrder.orderItems.filter(i => i.id != item.id)
            tempOrder.orderItems.push(tempItem)
            setOrder(tempOrder)
        }

        return (
            <View style={{
                flexDirection: 'row',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderBottomWidth: 2,
                borderColor: 'grey'
            }}>
                <Image source={{ uri: item.image }} style={{
                    width: 80, height: 80,
                    borderRadius: VALUES.commonRadius
                }} />

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{
                        flex: 3,
                        justifyContent: 'space-around',
                        paddingLeft: 10
                    }}>
                        <Text style={{ fontSize: VALUES.textContent }}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Icon onPress={() => setCount(pre => Math.max(0, pre - 1))} name='remove' size={30} color={COLORS.primary} />
                            <Text style={{ fontSize: VALUES.textContent, marginHorizontal: 5 }}>{count}</Text>
                            <Icon onPress={() => setCount(pre => pre + 1)} name='add' size={30} color={COLORS.primary} />
                            <View style={{ flex: 1 }}></View>
                            <Icon onPress={() => count > 0 ? UpdateCart() : null} name='add-circle-outline' size={30} color={COLORS.primary} />

                        </View>
                        <Text style={{ fontSize: VALUES.textContent }}>{item.priceNormal}-{'>'}{item.pricePromo}.000d</Text>
                    </View>

                </View>

            </View>
        )
    }
    return ( ///Main
        <SafeAreaView style={{ flex: 1 }}>
            <BackField text='< Back' navigation={navigation} />
            <SearchField searchFunction={text => setSearchKey(text)} styleEx={{
                marginHorizontal: VALUES.commonMargin,
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: VALUES.borderWidth,
                borderColor: 'grey',
                borderRadius: VALUES.inputRadius,
            }} />

            <FlatList
                data={items.filter(i => {
                    if (order.type == 'food') {
                        return i.shopId == route.params.shopId && system.foodType.includes(i.type) && JSON.stringify(i).includes(searchKey)
                    } else {
                        return i.shopId == route.params.shopId && system.goodType.includes(i.type) && JSON.stringify(i).includes(searchKey)
                    }
                })}
                renderItem={({ item }) => <ItemFlatlist item={item} />}
            />
            <Text style={{
                fontSize: VALUES.textContent,
                marginHorizontal: VALUES.commonMargin,
                marginVertical: 5
            }}>{order.orderItems.map(item => item.name + '(' + item.count + ') ')}</Text>
            <PrimaryButton title={'UPDATE CART'} onPress={() => Confirm('Update Order?', () => UpdateOrder())} />
            {/* then().catch(err=>console.log(err)) */}
        </SafeAreaView>
    )
    function UpdateOrder() {
        updateDoc(doc(db, 'orders', order.id.toString()), CalculateOrderValue(order))
            .then(re => {
                navigation.goBack()
            }).catch(err => console.log(err))
    }
}
export default ItemListForAdd;
