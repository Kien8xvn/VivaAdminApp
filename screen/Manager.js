import React, {  } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import COLORS from '../src/consts/colors';
import VALUES from '../src/consts/value';
import Icon from 'react-native-vector-icons/MaterialIcons';


const ManagerFrame = ({ icon, text, color, onPress }) => {
    return (
        <View style={{
            flex: 1,
            borderWidth: 0.5,
            borderColor: 'grey',
            borderRadius: VALUES.commonRadius,
            alignItems: 'center',
            margin: VALUES.commonMargin
        }}>
            <Icon onPress={onPress} name={icon} size={100} color={color} />
            <Text style={{ fontSize: VALUES.textH2 }}>{text}</Text>
        </View>
    )
}

const Manager = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
                <ManagerFrame icon='account-box' text='User' color='blue' onPress={() => navigation.navigate('ManagerUser')} />
                <ManagerFrame icon='fastfood' text='Items' color={COLORS.primary} onPress={() => navigation.navigate('ManagerItem')} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <ManagerFrame icon='handyman' text='Service' color='brown' onPress={() => navigation.navigate('ManagerService')} />
                <ManagerFrame icon='confirmation-number' text='Promo' color='yellow' onPress={() => navigation.navigate('ManagerPromo')} />
            </View>
        </SafeAreaView>
    )
}
export default Manager
