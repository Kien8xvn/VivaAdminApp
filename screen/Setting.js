import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image, Switch, FlatList, TouchableOpacity } from 'react-native';
import VALUES from '../src/consts/value';
import { BigTitleField } from '../Components';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Context } from '../App';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';



const Setting = ({ navigation }) => {
    const { currentUser, users } = useContext(Context);


    const SignOut = () => {
        signOut(auth).then(re => {
            updateDoc(doc(db, 'users', currentUser.id.toString()), {
                expoToken: 'none'
            }).then().catch()
        }).catch(err => console.log(err))
    }

    const WriteToken = () => {
        try {
            users.forEach(u => updateDoc(doc(db, 'users', u.id.toString()), {
                expoToken: currentUser.expoToken
            }))
        } catch (err) { console.log(err) }
    }


    const SettingField = ({ content, onPress = () => { } }) => {
        return (
            <View>
                <TouchableOpacity onPress={onPress} style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 3,
                    borderColor: 'grey'
                }}>
                    <Text style={{ fontSize: VALUES.textContent }}>{content}</Text>
                    <Text style={{ fontSize: VALUES.textContent }}>{'>'}</Text>
                </TouchableOpacity>

            </View>
        )

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <BigTitleField text='CÀI ĐẶT' styleEx={{ marginVertical: 10 }} />
            <SettingField content='Thông tin cá nhân' onPress={() => navigation.navigate('UserInfo')} />
            <SettingField content='THÔNG BÁO' onPress={() => navigation.navigate('NotifAll')} />
            <SettingField content='Đăng xuất' onPress={() => SignOut()} />
            <SettingField content='Write token' onPress={() => WriteToken()} />

        </SafeAreaView>
    )
}
export default Setting