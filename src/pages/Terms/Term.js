import { Calendar } from "react-native-calendars";
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Text, Switch } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { API } from "../../../services/api";
import { useState } from "react";
import { commonStyles } from "../../styles/CommonStyles";

export function Terms({ navigation, route }) {

    function navigateForSignInCalendar() {
        navigation.navigate('SignInCalendar')
    }
   

    const {users,andress,date} = route.params

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [errorMessage, setErrorMessage] = useState('')

    function saveUser() {
        if(!isEnabled){
            setErrorMessage('É necessário aceitar os termos para continuar')
        } else
        fetch(
            API + '/users',
            {
                body: JSON.stringify({
                    fullname: users.name,
                    contact: users.telephone,
                    email: users.email,
                    number_rg: users.rg,
                    cpf: users.cpf,
                    password: users.password,
                    andress: { 
                        cep: andress.cep,
                        street: andress.andress,
                        city: andress.city,
                        state: andress.state,
                        region: andress.neighborhood,
                        number: andress.number,
                        complement: andress.complement
                    },
                    billing_day: date

                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(() => {
                alert('Cadastro feito com sucesso')
                navigation.navigate('Initial')})
                
            .catch(() => alert('Houve um erro'))
    }



    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Termos de Uso</Text>
            <ScrollView>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae dignissim leo.
                        Nulla facilisi. Sed porttitor sapien eget lacinia vestibulum. Pellentesque dolor nunc, molestie id orci nec, ultrices vehicula mauris.
                        Integer consequat, sem quis facilisis pellentesque, elit orci consequat justo, ut egestas ante nunc eget orci. Aliquam at convallis ex.
                        Nam egestas ex nec ex eleifend, sed egestas magna hendrerit. Donec at turpis quam. Nullam ultrices massa ac dui bibendum dictum.
                        Ut sit amet maximus augue. Praesent id efficitur neque. Aliquam erat volutpat. Curabitur tempor, tortor vel euismod suscipit, lacus
                        mauris posuere nisl, vitae posuere nisl tellus eget eros. Aenean commodo quam ut dictum feugiat. Integer risus sapien, aliquet vel
                        tortor eget, euismod cursus lorem. Maecenas vel egestas purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis gravida turpis sed dignissim. Duis et fermentum massa. Nulla facilisi.
                        Donec vulputate turpis risus, non dapibus elit eleifend pulvinar. Vivamus a sem maximus, auctor nisl ut, ullamcorper dui.
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur et dolor magna.
                        Donec leo tellus, faucibus a tortor ac, facilisis volutpat enim. Nulla lectus nisl, gravida at mauris sed, auctor accumsan justo.
                        Ut ut ultrices felis, et accumsan lectus. Duis commodo tortor quis magna volutpat, in rutrum leo semper.
                        Vivamus viverra nunc suscipit, porttitor elit eu, hendrerit ipsum. Praesent at lorem in ipsum tempor aliquam a sit amet diam.
                        Praesent eu augue ac arcu aliquet suscipit. Suspendisse fringilla, nunc eget convallis eleifend, libero urna volutpat tellus, vel varius orci nunc at ex.
                        Pellentesque ultrices cursus sagittis. Mauris fringilla accumsan mauris, nec pharetra neque maximus blandit. Vivamus volutpat eros enim, non posuere justo aliquet sit amet.
                        Fusce non diam a arcu egestas porttitor. Aenean porttitor libero et varius tempor. Nam bibendum malesuada feugiat. Cras rutrum lectus turpis, vitae ornare mauris condimentum id.
                        In rhoncus risus viverra dolor aliquam, et hendrerit purus dictum. Phasellus ligula mi, rhoncus vitae turpis eget, condimentum iaculis urna.
                        Curabitur ac vestibulum justo. Nunc volutpat gravida faucibus. Fusce rhoncus dictum vestibulum. Donec porta arcu tempor condimentum ornare. Duis mollis faucibus leo vitae dignissim.</Text>
                </View>

                {
                        errorMessage !== '' && (
                            <View>
                                <Text style={commonStyles.errorMensage}>{errorMessage}</Text>
                            </View>
                        )

                    }

                <View style={styles.switch}>
                    <Switch
                        trackColor={{ false: "#767577", true: "green" }}
                        thumbColor={isEnabled ? "#FFF" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style={styles.text}>Aceito os termos</Text>
                </View>

                






                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={navigateForSignInCalendar} style={commonStyles.button}><Text>Voltar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={saveUser} style={commonStyles.button}><Text>Finalizar</Text></TouchableOpacity>
                </View>
            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gold',

    },
    button: {
        width: '40%',
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
    },
    title: {
        fontSize: 24,
        marginTop: 50,
        alignSelf: 'center'
    },
    text: {
        color: 'black',
        fontSize: 15

    },
    textContainer: {
        width: '90%',
        margin: 10,
        backgroundColor:'#FFF',        
        alignSelf: 'center'
    },
    switch: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
    }
}

)