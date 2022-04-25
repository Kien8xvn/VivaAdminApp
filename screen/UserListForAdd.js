import React, {useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image,FlatList } from 'react-native';
import COLORS from '../src/consts/colors';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Confirm, BackField, SearchField, PrimaryButton, CalculateOrderValue } from '../Components';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Context } from '../App';


const UserListForAdd = ({ navigation, route }) => {
    const [order, setOrder] = useState(route.params.order)
    const { items, system, users } = useContext(Context)
    const [searchKey, setSearchKey] = useState('')




    const UserFlatlist = ({ user }) => {
        const AddShipper = () => {
            if (route.params.orderType == 'item') {
                updateDoc(doc(db, 'orders', order.id.toString()), {
                    ...order,
                    shipper: user,
                    status: 'accept',
                    orderItems: order.orderItems.map(item => ({ ...item, orderStatus: 'accept' }))
                })
                    .then(re => {
                        navigation.goBack()
                    }).catch(err => console.log(err))
            }else{
                updateDoc(doc(db, 'ordersService', order.id.toString()), {
                    ...order,
                    shipper: user,
                    status: 'accept',
                })
                    .then(re => {
                        navigation.goBack()
                    }).catch(err => console.log(err))
            }

        }

        return (
            <View style={{
                flex: 0.5,
                borderWidth: 0.5,
                borderColor: 'grey',
                borderRadius: VALUES.commonRadius,
                alignItems: 'center',
                margin: VALUES.commonMargin
            }}>
                <Icon onPress={() => Confirm('Add Shipper?', () => AddShipper())} name='account-circle' size={100} color={COLORS.primary} />
                <Text style={{ fontSize: VALUES.textH2 }}>phone:{user.phone}</Text>
                <Text style={{ fontSize: VALUES.textH2 }}>name:{user.name}</Text>
                <Text style={{ fontSize: VALUES.textH2 }}>{user.role}</Text>

            </View>
        )
    }
    function FilterUser() {
        return users.filter(user => {
            return JSON.stringify(user).includes(searchKey)
        })
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
                numColumns={2}
                data={FilterUser()}
                renderItem={({ item }) => <UserFlatlist user={item} />}
            />
            {/* then().catch(err=>console.log(err)) */}
        </SafeAreaView>
    )
}
export default UserListForAdd;
