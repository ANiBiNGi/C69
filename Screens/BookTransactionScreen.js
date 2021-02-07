import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import { TextInput } from 'react-native-gesture-handler';

export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {hascamerapermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'}
    }
    getCameraPermissions = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hascamerapermissions:status === 'granted',
            buttonState:'clicked'
        })
    }
    handleBarcodeScanned = async({type,data}) =>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        const hascamerapermissions = this.state.hascamerapermissions;

        if(buttonState==='clicked' && hascamerapermissions){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned? undefined:this.handleBarcodeScanned}/>
            )

        }
        else if(buttonState==='normal'){
        return(           
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Image source = {require("../assets/booklogo.jpg")}
                style ={{width:200, height:200}}/>

                <View>
                <TextInput placeholder="BookID"/>
                <TouchableOpacity> <Text>Scan</Text> </TouchableOpacity>
                </View>
                <View>
                <TextInput placeholder="StudentID"/>
                <TouchableOpacity> <Text>Scan</Text> </TouchableOpacity>
                </View>
            </View>
        )   
    }
}
}
const styles = StyleSheet.create({
    scanButton: {padding:10,margin:10,backgroundColor:'pink'}
})