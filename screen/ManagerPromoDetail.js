import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import VALUES from '../src/consts/value';
import { BackField, TextPlate, Confirm, PrimaryButton } from '../Components';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Context } from '../App';


const ManagerPromoDetail = ({ navigation, route }) => {
    const [promo, setPromo] = useState(route.params)
    const { system } = useContext(Context)


    function ValidDate(text) {
        let arr = text.split('-')
        return arr.length == 3 && arr[0] > 0 && arr[0] < 32 && arr[1] > 0 && arr[1] < 13 & arr[2] > 2021
    }
    function ValidNumberArr(text) {
        let arr = text.split(',')
        let check = true
        arr.forEach(i => check = check && i > 0)
        return check
    }

    function CheckPromo() {
        let check = promo.code.length > 3 && ValidDate(promo.expire) && ValidDate(promo.start)
            && ValidNumberArr(promo.itemId) && ValidNumberArr(promo.shopId)
            && ValidNumberArr(promo.userId) && ValidNumberArr(promo.serviceId)
            && promo.maxUse >= 0 && promo.maxValue >= 0 && promo.minOrderValue >= 0 && promo.point >= 0
            && promo.value >= 0 && promo.note.length > 5 && system.promoType.includes(promo.type)
            && system.promoKind.includes(promo.kind) && system.promoStatusType.includes(promo.status)
        if (promo.id == 0 && check) { return 'new' }
        return check
    }

    const Save = () => {
        // Add new Item
        if (CheckPromo() == 'new') {
            let newId = system.promoCount + 1
            setDoc(doc(db, 'promos', newId.toString()), {
                ...promo,
                id: newId,
                timeCreate: new Date().toLocaleString()
            }).then(() => {
                updateDoc(doc(db, "system", "system"), {
                    promoCount: newId
                }).then().catch(err => console.log(err))
            }).catch(err => console.log(err))

            // Update Item
        } else {
            if (CheckPromo()) {
                setDoc(doc(db, 'promos', promo.id.toString()), promo)
                    .then().catch(err => console.log(err))
            } else {
                alert('invalid data')
            }
        } Ô
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: VALUES.commonMargin }}>
                <BackField text='<' navigation={navigation} />
                <Text style={{ flex: 1, fontSize: VALUES.textH2, textAlign: 'center' }}>ID:{promo.id}</Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>
                <TextPlate onChangeText={text => setPromo({ ...promo, type: text })} input={promo.type} title={'Loại'} styleEx={{ flex: 3, marginVertical: 5 }} note={""} />
                <TextPlate onChangeText={text => setPromo({ ...promo, code: text })} input={promo.code} title={'Code'} styleEx={{ flex: 2, marginVertical: 5 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>
                <TextPlate onChangeText={text => setPromo({ ...promo, start: text })} input={promo.start} title={'Start'} styleEx={{ flex: 3, marginVertical: 5 }} note={" "} />
                <TextPlate onChangeText={text => setPromo({ ...promo, expire: text })} input={promo.expire} title={'HSD'} styleEx={{ flex: 2, marginVertical: 5 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>
                <TextPlate input={promo.timeCreate.toString()} title={'Create'} styleEx={{ flex: 3, marginVertical: 5 }} note={" "} />
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>
                <TextPlate onChangeText={text => setPromo({ ...promo, maxValue: Number(text) })} input={promo.maxValue.toString()} title={'MaxValue'} styleEx={{ flex: 3, marginVertical: 5 }} />
                <TextPlate onChangeText={text => setPromo({ ...promo, maxUse: Number(text) })} input={promo.maxUse.toString()} title={'MaxUse'} styleEx={{ flex: 2, marginVertical: 5 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>
                <TextPlate input={promo.countUse.toString()} title={'Used'} styleEx={{ flex: 1, marginVertical: 5 }} note={" "} />
                <TextPlate onChangeText={text => setPromo({ ...promo, status: text })} input={promo.status} title={'Status'} styleEx={{ flex: 1, marginVertical: 5 }} />
            </View>
            <TextPlate onChangeText={text => setPromo({ ...promo, minOrderValue: Number(text) })} input={promo.minOrderValue.toString()} title={'MinOrder'} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate onChangeText={text => setPromo({ ...promo, point: Number(text) })} input={promo.point.toString()} title={'Point'} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate onChangeText={text => setPromo({ ...promo, kind: text })} input={promo.kind} title={'Loại'} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} note={""} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>
                <TextPlate onChangeText={text => setPromo({ ...promo, shopId: text })} input={promo.shopId} title={'ShopID'} styleEx={{ flex: 3, marginVertical: 5 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>
                <TextPlate onChangeText={text => setPromo({ ...promo, userId: text })} input={promo.userId} title={'UserID'} styleEx={{ flex: 3, marginVertical: 5 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>
                <TextPlate onChangeText={text => setPromo({ ...promo, itemId: text })} input={promo.itemId} title={'ItemID'} styleEx={{ flex: 3, marginVertical: 5 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: VALUES.commonMargin }}>

                <TextPlate onChangeText={text => setPromo({ ...promo, serviceId: text })} input={promo.serviceId} title={'ServiceId'} styleEx={{ flex: 3, marginVertical: 5 }} />
            </View>
            {/* Info */}
            <TextPlate onChangeText={text => setPromo({ ...promo, note: text })} input={promo.note} title={'Note'} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <PrimaryButton styleEx={{ marginVertical: 15 }} title='Save' onPress={() => Confirm('Update Promo?', () => Save())} />

        </SafeAreaView>
    )
}
export default ManagerPromoDetail;
