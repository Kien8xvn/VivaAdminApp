import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, Switch, TouchableOpacity } from 'react-native';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BackField, SearchField } from '../Components';
import { Context } from '../App';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ItemFrame = ({ item, onPress }) => {
    const [switchValue, setswitchValue] = useState(item.status == 'enable' ? true : false)
    const toggleSwitch = (value) => {
        setswitchValue(value)
        updateDoc(doc(db, "items", item.id.toString()), {
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
                <Image source={{ uri: item.image }} style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'contain',
                    marginTop: 10,
                    borderRadius: VALUES.commonRadius
                }} />
            </TouchableOpacity>
            <Text style={{ fontSize: VALUES.textH2 }}>{item.name}+ {item.index}</Text>
            <Switch
                trackColor={{ false: "grey", true: "red" }}
                onValueChange={toggleSwitch}
                value={switchValue}
            />

        </View>
    )
}

const ManagerItem = ({ navigation }) => {
    const { items } = useContext(Context)
    const [searchKey, setSearchKey] = useState('')


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <BackField text='<' navigation={navigation} />
                <SearchField searchFunction={text => setSearchKey(text)} styleEx={{ flex: 1, marginHorizontal: 10 }} />
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
                {/* Add new item */}
                <Icon onPress={() => navigation.navigate('ItemDetail', {
                    ...items[1],
                    id: 0
                })}
                    style={{ marginRight: VALUES.commonMargin }}
                    name='add-circle-outline' color='red' size={45} />
            </View>

            {/* Item list */}
            <FlatList
                numColumns={2}
                data={items.filter(i => JSON.stringify(i).includes(searchKey))}
                renderItem={({ item }) => <ItemFrame item={item} onPress={() => navigation.navigate('ManagerItemDetail', item)} />}
            />
        </SafeAreaView>
    )
}
export default ManagerItem;
