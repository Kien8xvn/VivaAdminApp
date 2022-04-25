import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { BigTitleField, PrimaryButton, BackField, PrimaryInput, Confirm } from '../Components';
import { Context } from '../App';
import { sendNotification } from '../notification';



const NotifAll = ({ navigation }) => {
    const { users } = useContext(Context)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <BackField text='<' navigation={navigation} />
            <BigTitleField text='THÔNG BÁO' styleEx={{ marginVertical: 10 }} />
            <PrimaryInput value={title} styleEx={{ marginVertical: 5 }} placeHolder='Title' onChangeText={text => setTitle(text)} />
            <PrimaryInput value={content} placeHolder='Thông báo' isPassword={false}
                styleEx={{ marginVertical: 5, height: '70%' }} onChangeText={text => setContent(text)} />
            <PrimaryButton title={'GỬI'} onPress={() => Confirm('Gửi thông báo cho tất cả mọi người?', () => SendToAll())} />
        </SafeAreaView>
    )

    function SendToAll() {
        (title.length > 5 && content.length > 5) ?
            users.forEach(u => sendNotification(title, content, u.expoToken)) : alert('nothing to send')


    }
}


export default NotifAll