import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import VALUES from '../src/consts/value';
import { BackField, TextPlate,Confirm ,PrimaryButton} from '../Components';
import { Context } from '../App';
import { db } from '../firebase';
import { updateDoc, doc, setDoc, increment } from 'firebase/firestore';


const ManagerItemDetail = ({ navigation, route }) => {  
    const [item, setItem] = useState(route.params)
    const { system, setSystem } = useContext(Context)

    function CheckItem() {
        let check = item.name.length > 5 && item.image.length > 5 && item.shopId > 0 && item.priceNormal > 0 && item.pricePromo > 0
            && item.index > 0 && item.timeEnd < 24 && item.timeEnd >= 0 && item.timeStart < 24 && item.timeStart >= 0
            && item.note.length > 5 && system.itemStatusType.includes(item.status) && system.badgeType.includes(item.badge)
            && system.itemType.includes(item.type)
        if (item.id == 0 && check) { return 'new' }
        return check
    }
    const Save = () => {
        // Add new Item
        if (CheckItem() == 'new') {
            let newId = system.item.count + 1
            setDoc(doc(db, 'items', newId.toString()), {
                ...item,
                id: newId
            }).then(() => {
                updateDoc(doc(db, "system", "system"), {
                    itemCount: increment(1)
                }).then().catch(err => console.log(err))
            })
                .catch(err => console.log(err))

            // Update Item
        } else {
            if (CheckItem()) {
                setDoc(doc(db, 'items', item.id.toString()), item).then().catch(err => console.log(err))
            } else {
                alert('invalid data')
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: VALUES.commonMargin }}>
                <BackField text='<' navigation={navigation} />
                <Text style={{ flex: 1, fontSize: VALUES.textH2, textAlign: 'center' }}>ID:{item.id}</Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginRight: VALUES.commonMargin }}>
                <Text style={{ fontSize: VALUES.textContent, marginLeft: VALUES.commonMargin }}>Image:</Text>
                <Image source={{ uri: item.image }} style={{
                    width: 40,
                    height: 40,
                    marginLeft: VALUES.commonMargin
                }} />
                <Image source={{ uri: 'http://127.0.0.1/image/Food01.png' }} style={{
                    width: 40,
                    height: 40,
                    marginLeft: VALUES.commonMargin
                }} />
                <Image source={{ uri: 'http://127.0.0.1/image/Food01.png' }} style={{
                    width: 40,
                    height: 40,
                    marginLeft: VALUES.commonMargin
                }} />
            </View>
            <TextPlate onChangeText={text => setItem({ ...item, name: text })} title={'Name'} input={item.name} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate onChangeText={text => setItem({ ...item, shopId: Number(text) })} title={'ShopID'} input={item.shopId.toString()} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextPlate onChangeText={text => setItem({ ...item, priceNormal: Number(text) })} title={'Giá'} input={item.priceNormal.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate onChangeText={text => setItem({ ...item, pricePromo: Number(text) })} title={'Giá KM'} input={item.pricePromo.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextPlate onChangeText={text => setItem({ ...item, image: text })} title={'URL'} input={item.image} styleEx={{ flex: 5, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate title={''} styleEx={{ flex: 4, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate title={''} styleEx={{ flex: 4, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextPlate onChangeText={text => setItem({ ...item, index: Number(text) })} title={'Index'} input={item.index.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate title={'Lượt đặt'} input={item.orderCount.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            </View>
            <TextPlate onChangeText={text => setItem({ ...item, type: text })} title={'Phân loại'} input={item.type} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} note={'Đồ ăn,Đồ uống'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextPlate onChangeText={text => setItem({ ...item, timeStart: Number(text) })} title={'ActiveTime'} input={item.timeStart.toString()} styleEx={{ flex: 4, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate onChangeText={text => setItem({ ...item, timeEnd: Number(text) })} title={''} input={item.timeEnd.toString()} styleEx={{ flex: 3, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} note={" "} />
            </View>
            <TextPlate onChangeText={text => setItem({ ...item, badge: text })} title={'Huy hiệu'} input={item.badge} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} note={'Đồ ăn,Đồ uống'} />
            {/* Info */}
            <TextPlate onChangeText={text => setItem({ ...item, note: text })} title={'Note'} input={item.note} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <PrimaryButton styleEx={{ marginVertical: 15 }} title='Save' onPress={() => Confirm('Update Item?', () => Save())} />
        </SafeAreaView>
    )
}
export default ManagerItemDetail
