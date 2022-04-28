import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TextInput } from 'react-native';
import COLORS from '../src/consts/colors';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BackField, BigTitleField, TextField, HorizonLine, PrimaryButton, Confirm, CalculateOrderValue } from '../Components';
import { db } from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Context } from '../App';
import { sendNotification } from '../notification';


const ValueLine = ({ text1, text2 }) => {
    return (
        <View style={{
            flexDirection: 'row',
            marginVertical: 2,
            justifyContent: 'flex-end'
        }}>
            <Text style={{ color: 'black', fontSize: VALUES.textH2 }}>{text1}</Text>
            <Text style={{ color: 'red', fontSize: VALUES.textH2 }}>{text2}</Text>

        </View>
    )
}

const AdServiceOrderDetail = ({ navigation, route }) => { ///main
    const [order, setOrder] = useState(route.params)
    const { currentUser, users } = useContext(Context);
    const [adminNote, setAdminNote] = useState(route.params.adminNote)


    useEffect(() => { /// listen order
        const unsub = onSnapshot(doc(db, "ordersService", order.id.toString()), (doc) => {
            setOrder(doc.data())
        });
        return () => {
            unsub()
        }
    }, [])





    return (  ///Main
        <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <BackField text='<' navigation={navigation} />
                <BigTitleField text={'ID:' + order.id} styleEx={{ flex: 1, marginright: 10 }} />
                {currentUser.role != 'admin' ? null :

                    <View style={{ flexDirection: 'row' }}>
                        <Icon onPress={() => Confirm('Reset đơn hàng?', () => SetOrderStatus('pendding'))} name='sync' size={30} color={COLORS.primary} />
                        <Icon onPress={() => Confirm('Huỷ đơn hàng?', () => SetOrderStatus('cancel'))} name='delete' size={30} color={COLORS.primary} />
                    </View>
                }

            </View>
            {/* Order list */}

            <View style={{
                marginHorizontal: VALUES.commonMargin,
                marginVertical: VALUES.commonMargin
            }}>

                <View style={{
                    alignItems: 'center',
                }}>
                    <Image source={{ uri: order.service.image }} style={{
                        width: 300, height: 300,
                    }} />
                    <Text style={{
                        fontSize: VALUES.textH1,
                        fontWeight: 'bold',
                    }}>{order.service.name}</Text>
                    <Text style={{ fontSize: VALUES.textContent, color: 'blue' }}>{order.status}</Text>

                </View>

                {/* <FlatList
                    style={{ height: '50%' }}
                    data={shopIdArr}
                    renderItem={({ item }) => <OrderShopFlatlist shopId={item} />}
                /> */}
            </View>
            {/* User info */}
            {order.status == 'pendding' && currentUser.role != 'admin' ?
                <TextField text='Hiển thị khi nhận đơn' />
                :
                <TextField text={'Tên khách hàng: ' + order.user.name + '\n' +
                    'SDT: ' + order.user.phone + '\n' +
                    'Địa chỉ: ' + order.user.address
                } />
            }

            {/* Empty space */}
            <View style={{ flex: 1 }}></View>
            {/* value info */}
            <View style={{ alignItems: 'flex-end', marginRight: VALUES.commonMargin }}>
                <ValueLine text1={''} text2={order.value.service + 'k'} />
                <ValueLine text1={'-KM:'} text2={order.value.promo + 'k'} />
                <ValueLine text1={'Tổng:'} text2={order.value.total + 'k'} />
            </View>


            {/* Note from Admin */}
            {currentUser.role != 'admin' ? null :
                < TextInput
                    style={{
                        fontSize: VALUES.textContent, flex: 1,
                        marginLeft: VALUES.commonMargin,
                    }}
                    placeholder='AdminNote'
                    value={adminNote}
                    onChangeText={text => setAdminNote(text)}
                />
            }


            {/* Shipper info show only for admin  - function add shipper */}
            {currentUser.role != 'admin' ? null :
                <View style={{ marginHorizontal: VALUES.commonMargin, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Icon name='delivery-dining' size={80} color={COLORS.primary} />
                    <Text style={{ fontSize: VALUES.textH2 }}>{order.shipper.phone}</Text>
                    <View style={{ flex: 1 }}></View>
                    {order.status != 'pendding' ? <Icon onPress={() => Confirm('sure?', () => SetOrderStatus('pendding'))} name='remove-circle-outline' size={30} color={COLORS.primary} />
                        : <Icon onPress={() => navigation.navigate('UserListForAdd', { order: order, orderType: 'service' })} name='add-circle-outline' size={30} color={COLORS.primary} />
                    }
                </View>
            }
            {/* accept button  */}
            {order.status == 'pendding' ?
                <PrimaryButton title={'XÁC NHẬN ĐƠN HÀNG'} onPress={() => Confirm('Nhận đơn hàng?', () => SetOrderStatus('accept'))} />
                : order.status == 'accept' ?
                    <PrimaryButton title={'HOÀN THÀNH ĐƠN HÀNG'} onPress={() => Confirm('Hoàn thành đơn hàng?', () => SetOrderStatus('finish'))} />
                    : null
            }
        </SafeAreaView>
    )

    function SetOrderStatus(status) { /// shop xác nhận đơn hàng
        try {
            updateDoc(doc(db, 'ordersService', order.id.toString()), {
                status: status,
                adminNote: adminNote,
                shipper: status == 'pendding' ? { id: 0 } : status == 'accept' ? currentUser : order.shipper,
                timeDone: new Date().toLocaleString()
            })

            if (status == 'accept') {
                users.filter(u => u.role == 'admin' || u.id == order.user.id).forEach(u => {
                    sendNotification('Đơn hàng ID' + order.id.toString(), 'Đơn hàng Accept', u.expoToken)
                    console.log(u.id)
                })
            }
            if (status == 'finish') {
                users.filter(u => u.role == 'admin').forEach(u => {
                    sendNotification('Đơn hàng ID' + order.id.toString(), 'Đơn hàng Finish', u.expoToken)
                    console.log(u.id)
                })
            }
            if (status == 'cancel') {
                users.filter(u => u.id == order.user.id || u.id == order.shipper.id)
                    .forEach(u => {
                        sendNotification('Đơn hàng ID' + order.id.toString(), 'Đơn hàng cancel', u.expoToken)
                        console.log(u.id)
                    })
            }
            if (status == 'pendding') {
                users.filter(u => (u.role == 'shipper' && u.power.includes(order.type)))
                    .forEach(u => {
                        sendNotification('Đơn hàng ID' + order.id.toString(), 'Đơn hàng mới', u.expoToken)
                        console.log(u.id)
                    })
            }


        } catch (err) {
            alert(err)
        }
    }

}


export default AdServiceOrderDetail

