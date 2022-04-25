import React, { useState, useContext } from 'react';
import { Text, Button, FlatList, SafeAreaView } from 'react-native'
import { BackField, BigTitleField, PrimaryInput } from '../Components';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'
import { sendNotification } from '../notification';
import { Context } from '../App';

const Policy = ({ navigation }) => {
    const { users } = useContext(Context)
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    function sendNotif() {
        let token = users.find(u => u.id == id).expoToken
        try { sendNotification(title, body, token) }
        catch (err) {
            alert(err)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackField text='< Back' navigation={navigation} />
            <BigTitleField text='POLICY' />
            <PrimaryInput iconName='phone' placeHolder='id' value={id} styleEx={{ marginVertical: 5 }}
                onChangeText={text => setId(text)} />
            <PrimaryInput iconName='phone' placeHolder='title' value={title} styleEx={{ marginVertical: 5 }}
                onChangeText={text => setTitle(text)} />
            <PrimaryInput iconName='phone' placeHolder='body' value={body} styleEx={{ marginVertical: 5 }}
                onChangeText={text => setBody(text)} />
            <Button title='Send' onPress={() => sendNotif()} />
        </SafeAreaView>
    )
}
export default Policy;
