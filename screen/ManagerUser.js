import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, Switch, TouchableOpacity } from 'react-native';
import COLORS from '../src/consts/colors';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BackField, SearchField } from '../Components';
import { Context } from '../App';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';


const UserFrame = ({ user, onPress }) => {
    const [switchValue, setswitchValue] = useState(user.status == 'enable' ? true : false)
    const toggleSwitch = (value) => {
        setswitchValue(value)
        try {
            updateDoc(doc(db, "users", user.id.toString()), {
                status: value == true ? 'enable' : 'disable'
            })
        } catch (err) {
            console.log(err)
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
            <Icon onPress={onPress} name='account-circle' size={100} color={COLORS.primary} />
            <Text style={{ fontSize: VALUES.textH2 }}>{user.phone}-{user.id}</Text>
            <Switch
                trackColor={{ false: "grey", true: "red" }}
                onValueChange={toggleSwitch}
                value={switchValue}
            />


        </View>
    )
}

const ManagerUser = ({ navigation }) => {
    const [searchKey, setSearchKey] = useState('')
    const { users } = useContext(Context)
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
                    marginRight: VALUES.commonMargin
                }}>
                    <TouchableOpacity>
                        <Text style={{
                            fontSize: VALUES.textContent,
                            padding: 10,
                        }}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                numColumns={2}
                data={users.filter(i => JSON.stringify(i).includes(searchKey))}
                renderItem={({ item }) => <UserFrame user={item} onPress={() => navigation.navigate('ManagerUserDetail', item)} />}
            />
        </SafeAreaView>
    )
}
export default ManagerUser;
