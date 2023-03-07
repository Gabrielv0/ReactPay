import {View, Text, SafeAreaView, Button, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { commonStyles } from '../../styles/CommonStyles'


export function Scanner({navigation}){

    const [hasPermission, setHasPermission] = useState(false)
    const [scanned, setScanned] = useState(false)
    const [debtsCode,setDebtsCode] = useState('')
  
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status)
      setHasPermission(status === 'granted' ? true : false)
    }
  
    useEffect(() => {
      getPermission()
    }, [])
  
    function getResult({ data }) {
      setScanned(true)
      setDebtsCode(data)
  
      navigation.navigate('DebtsDetails',{
        debtsCode: debtsCode
      })
    }
  
    function openCamera() {
      setScanned(false)
      getPermission()
    }
  
    return (
      <SafeAreaView style={styles.container}>
        
  
        {
          hasPermission === false && <Text>Permissão para câmera negada</Text>
        }
  
        {
          (hasPermission === true && scanned === false) &&
          <BarCodeScanner
            onBarCodeScanned={getResult}
            style={{
              width: Dimensions.get('screen').width * 0.8,
              height: Dimensions.get('screen').height * 0.6,
            }}
            barCodeTypes={['code39']}
          />
        }
        <TouchableOpacity onPress={openCamera} style={commonStyles.button}><Text>Scannear</Text></TouchableOpacity>
        
  
      </SafeAreaView>
    )
  
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
  