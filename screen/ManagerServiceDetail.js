import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image, Alert } from 'react-native';
import VALUES from '../src/consts/value';
import { BackField, TextPlate,Confirm ,PrimaryButton} from '../Components';
import { Context } from '../App';
import { updateDoc, doc, setDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';


const ManagerServiceDetail = ({ navigation, route }) => { 
    const [service, setService] = useState(route.params)
    const { system } = useContext(Context)

    function CheckService() {
        let check = service.name.length > 5 && service.address.length > 5 && service.image.length > 5 &&
            service.note.length > 5 && service.priceNormal > 0 && service.pricePromo > 0 && service.shopId > 0
            && service.index > 0
        if (service.id == 'new' && check) return 'new' 
        return check
    }



    const Save = () => {
        if (CheckService() == 'new') { /// new service
            let newId = system.serviceCount + 1
            setDoc(doc(db, 'services', newId.toString()), {
                ...service,
                id: newId
            }).then(() => {
                updateDoc(doc(db, "system", "system"), {
                    serviceCount: increment(1)
                }).then().catch(err => console.log(err))
            }).catch(err => console.log(err))

        } else {
            if (CheckService()) {
                setDoc(doc(db, 'services', service.id.toString()), service)
                    .then().catch(err => console.log(err))
            } else {
                alert('invalid data')
            }
        }
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: VALUES.commonMargin }}>
                <BackField text='<' navigation={navigation} />
                <Text style={{ flex: 1, fontSize: VALUES.textH2, textAlign: 'center' }}>ID:{service.id}</Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginRight: VALUES.commonMargin }}>
                <Text style={{ fontSize: VALUES.textContent, marginLeft: VALUES.commonMargin }}>Image:</Text>
                <Image source={{ uri: service.image }} style={{
                    width: 40,
                    height: 40,
                    marginLeft: VALUES.commonMargin
                }} />
            </View>
            <TextPlate title={'Name'} onChangeText={text => setService({ ...service, name: text })} input={service.name} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate title={'UserID'} input={service.id.toString()} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextPlate title={'Giá'} onChangeText={text => setService({ ...service, priceNormal: Number(text) })} input={service.priceNormal.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate title={'Giá KM'} onChangeText={text => setService({ ...service, pricePromo: Number(text) })} input={service.pricePromo.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            </View>
            <TextPlate title={'ShopId'} onChangeText={text => setService({ ...service, shopId: Number(text) })} input={service.shopId.toString()} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextPlate title={'URL'} onChangeText={text => setService({ ...service, image: text })} input={service.image} styleEx={{ flex: 5, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextPlate title={'Index'} onChangeText={text => setService({ ...service, index: Number(text) })} input={service.index.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
                <TextPlate title={'Lượt đặt'} input={service.orderCount.toString()} styleEx={{ flex: 1, marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            </View>
            {/* Info */}
            <TextPlate title={'Address'} onChangeText={text => setService({ ...service, address: text })} input={service.address} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate title={'phone'} onChangeText={text => setService({ ...service, phone: Number(text) })} input={service.phone.toString()} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />
            <TextPlate title={'Note'} onChangeText={text => setService({ ...service, note: text })} input={service.note} styleEx={{ marginHorizontal: VALUES.commonMargin, marginVertical: 5 }} />

            <PrimaryButton onPress={() => Confirm('Update Service?', () => Save())} styleEx={{ marginVertical: 15 }} title='Save' />
        </SafeAreaView>
    )
}
export default ManagerServiceDetail;
