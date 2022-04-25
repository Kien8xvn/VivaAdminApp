import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, Switch, TouchableOpacity } from 'react-native';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BackField, SearchField } from '../Components';
import { Context } from '../App';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';



const ServiceFrame = ({ service, onPress }) => {
    const [switchValue, setswitchValue] = useState(service.status == 'enable' ? true : false)
    const toggleSwitch = (value) => {
        setswitchValue(value)
        updateDoc(doc(db, "services", service.id.toString()), {
            status: value == true ? 'enable' : 'disable'
        }).then().catch(err => console.log(err))
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
            <TouchableOpacity onPress={onPress}>
                <Image source={{ uri: service.image }} style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'contain',
                    marginTop: 10,
                }} />
            </TouchableOpacity>
            <Text style={{ fontSize: VALUES.textH2 }}>{service.name}</Text>
            <Switch
                trackColor={{ false: "grey", true: "red" }}
                onValueChange={toggleSwitch}
                value={switchValue}
            />

        </View>
    )
}

const ManagerService = ({ navigation }) => {
    const { services } = useContext(Context)

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
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ServiceDetail', {
                        ...services[0],
                        id: 'new',
                        name: ''
                    })
                }}
                    style={{ marginRight: VALUES.commonMargin }}>
                    <Icon name='add-circle-outline' color='red' size={45} />
                </TouchableOpacity>

            </View>
            <FlatList
                numColumns={2}
                data={services}
                renderItem={({ item }) => <ServiceFrame service={item} onPress={() => navigation.navigate('ManagerServiceDetail', item)} />}
            />

        </SafeAreaView>
    )
}
export default ManagerService;
