import { Calendar } from "react-native-calendars";
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { commonStyles } from "../../styles/CommonStyles";

import { useState } from "react";
import {format} from 'date-fns'

export function SignInCalendar({navigation, route}) {
    
    const [date, setDate] = useState(() => {
        const dataAtual = new Date()
        return format(dataAtual, 'yyyy-MM-dd')
    })
    
    
    const {users,andress} = route.params
    
    function navigateForTerms(){
        navigation.navigate('Terms',
        {
            users:users,
            andress: {andress},
            date: date
        })
    }

    function navigateForSignInAndress(){
        navigation.navigate('SignInAndress')
    }

    




    return (
        <SafeAreaView style={styles.container}>
        
        <Calendar
            style={{ margin: 20, borderRadius: 10, marginTop: 40 }}
            markedDates={{
                [date]: {
                    selected: true,
                    marked: true,
                    selectedColor: true,
                    dotColor: 'blue'
                },
            }}
            onDayPress={(currentDate) => setDate(currentDate.dateString)}
            theme={{
                selectedDayTextColor: 'green',
                todayTextColor: '#FFF',

            }}
            />

            <View style={{ flexDirection: 'row',  justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={navigateForSignInAndress}  style={commonStyles.button}><Text>Voltar</Text></TouchableOpacity>
            <TouchableOpacity onPress={navigateForTerms} style={commonStyles.button}><Text>Continuar</Text></TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gold',
        
    },
   
    
})