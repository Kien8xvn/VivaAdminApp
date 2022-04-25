import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, Switch, TouchableOpacity } from 'react-native';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BackField, SearchField } from '../Components';
import { Context } from '../App';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const PromoFrame = ({ promo, onPress }) => {
    const [switchValue, setswitchValue] = useState(promo.status == 'enable' ? true : false)
    const toggleSwitch = (value) => {
        setswitchValue(value)
        updateDoc(doc(db, "promos", promo.id.toString()), {
            status: value == true ? 'enable' : 'disable'
        }).then().catch(err => console.log(err))
    }
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: VALUES.commonMargin, marginVertical: 5 }}>
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: 'yellow',
                height: VALUES.promoImageSize,
                width: VALUES.promoImageSize
            }}
                onPress={onPress}
            >
                <Text style={{ fontSize: VALUES.textH1 }}>{promo.type}</Text>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                borderColor: 'grey',
                borderTopWidth: 0.5, borderBottomWidth: 0.5,
                justifyContent: 'space-around',
                paddingLeft: 10
            }}>
                <Text style={{ fontSize: VALUES.textContent }}>Đơn hàng tối thiểu {promo.minOrderValue}k </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: VALUES.textTab,
                        color: 'red',
                        borderColor: 'red',
                        borderWidth: 0.5,
                    }}>Tối đa {promo.maxValue}k + {promo.id}</Text>
                    <Switch
                        trackColor={{ false: "grey", true: "red" }}
                        onValueChange={toggleSwitch}
                        value={switchValue}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'grey', fontSize: VALUES.textTab }}>HSD:{promo.expire}</Text>
                    <Text style={{ color: 'blue', fontSize: VALUES.contentSize }}>{promo.point} điểm</Text>
                </View>


            </View>
        </View>
    )
}

const ManagerPromo = ({ navigation }) => {
    const { promos } = useContext(Context)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <BackField text='<' navigation={navigation} />
                <SearchField styleEx={{ flex: 1, marginHorizontal: 10 }} />
                <View style={{
                    flexDirection: 'row',
                    borderWidth: VALUES.borderWidth,
                    borderColor: 'grey',
                    borderRadius: VALUES.inputRadius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5
                }}>
                    <TouchableOpacity>
                        <Text style={{
                            fontSize: VALUES.textContent,
                            padding: 10,
                        }}>Filter</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('PromoDetail', {
                        code: "",
                        countUse: 10,
                        expire: "30-03-2022",
                        id: 0,
                        itemId: "4,5,6",
                        kind: "food",
                        maxUse: 0,
                        maxValue: 0,
                        minOrderValue: 0,
                        note: "",
                        point: 0,
                        shopId: "1,2,3",
                        start: "01-03-2022",
                        status: "enable",
                        timeCreate: 34234,
                        type: "%",
                        userId: "3,4,5",
                        value: 0
                    })
                }}
                    style={{ marginRight: VALUES.commonMargin }}>
                    <Icon name='add-circle-outline' color='red' size={45} />
                </TouchableOpacity>

            </View>
            <FlatList
                numColumns={1}
                data={promos}
                renderItem={({ item }) => <PromoFrame promo={item} onPress={() => navigation.navigate('ManagerPromoDetail', item)} />}
            />
        </SafeAreaView>
    )
}
export default ManagerPromo;
