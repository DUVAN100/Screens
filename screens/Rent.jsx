import React, { useState } from 'react';
import { StyleSheet,View, Alert, Modal,TouchableHighlight } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Text, Icon, Checkbox  } from 'react-native-paper';

export const Rent = ({navigation,route}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    let arrayUsers = route.params[0];
    let arrayRent = route.params[1];
    let arrayCars = route.params[2];
    console.log("arraysCars", arrayCars)
 
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
          rentNumber: '',
          nameUser: '',
          plateNumber:'',
          rentDate:''
        }
      });
      const showModal = () => {
        setModalVisible(true);
      }
      const closeModal = () => {
        setModalVisible(false);
      }
      const clearFields = ()=>{
        reset()
      }

    const onsubmit=(data)=>{
        let findUser = arrayUsers.find(usr => usr.name == data.nameUser)
        let findPlateNumber = arrayCars.find(usr => usr.plateNumber === data.plateNumber)
        if(findUser === undefined){
            showModal();
            setMessage('The user is not registered')
        }else if(findPlateNumber === undefined){
            showModal();
            setMessage('The license plate number does not exist.');
        }else if(findPlateNumber.isChecked === true){
            showModal();
            setMessage('The car is not available');
        }else{
             showModal();
             findPlateNumber.isChecked = true
             arrayRent.push(data);
             setMessage('The car is available and your rent was generated correctly');
             reset();
        }            
        console.log("findPlateNumber: ", findPlateNumber)
        console.log("CHANG ARRAY CARS ", arrayCars)
    }
    return (
        <View style={styles.container}> 
            <Controller 
                control={control}
                rules={{
                    required: true,
                    maxLength:8,
                    minLength:2,
                    pattern: /^[0-9]+$/
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={{margin:20, borderRadius:20}}
                    placeholder="1234567890"
                    label="Rent Number"
                    mode='outlined'
                    left={<TextInput.Icon icon="counter"/>}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    )}
                    name="rentNumber"
            />
                {errors.rentNumber?.type == 'required' && <Text style={{color:'red'}}>rentNumber is required.</Text>}
                {errors.rentNumber?.type == 'maxLength' && <Text style={{color:'red'}}>rentNumber 30 mas characters.</Text>}
                {errors.rentNumber?.type == 'minLength' && <Text style={{color:'red'}}>rentNumber 3 mas characters.</Text>}
                {errors.rentNumber?.type == 'pattern' && <Text style={{color:'red'}}>Format of rentNumber not is correct.</Text>}

            <Controller 
                control={control}
                rules={{
                    required: true,
                    maxLength:10,
                    minLength:2,
                    pattern:/^[a-zA-Z0-9]+$/
                 }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{margin:20, borderRadius:10}}
                        placeholder="Write your user name"
                        label="name user"
                        mode='outlined'
                        left={<TextInput.Icon icon="clipboard-account"/>}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                  name="nameUser"
            />
                {errors.nameUser?.type == 'required' && <Text style={{color:'red'}}>Name is required.</Text>}
                {errors.nameUser?.type == 'maxLength' && <Text style={{color:'red'}}>Name 30 mas characters.</Text>}
                {errors.nameUser?.type == 'minLength' && <Text style={{color:'red'}}>Name 3 mas characters.</Text>}
                {errors.nameUser?.type == 'pattern' && <Text style={{color:'red'}}>Only letters and numbers name.</Text>}


        <Controller 
            control={control}
            rules={{
                required: true,
                maxLength:8,
                minLength:2,
                pattern: /^[A-Z]{3}[0-9]{3}$/
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{margin:20, borderRadius:20}}
                  placeholder="(Same format AAA123)"
                  label="plateNumber"
                  mode='outlined'
                  left={<TextInput.Icon icon="counter"/>}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                  />
                )}
                name="plateNumber"
        />
            {errors.plateNumber?.type == 'required' && <Text style={{color:'red'}}>plateNumber is required.</Text>}
            {errors.plateNumber?.type == 'maxLength' && <Text style={{color:'red'}}>plateNumber 30 mas characters.</Text>}
            {errors.plateNumber?.type == 'minLength' && <Text style={{color:'red'}}>plateNumber 3 mas characters.</Text>}
            {errors.plateNumber?.type == 'pattern' && <Text style={{color:'red'}}>Format of rentNumber not is correct.</Text>}

        <Controller
              control={control}
              rules={{
                required: true,
                pattern:/^\d{4}-\d{2}-\d{2}$/
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{margin:20, borderRadius:20}}
                    label="Date rent"
                    placeholder='Format date: (YYY-MM-DDD)'
                    mode='outlined'
                    left={<TextInput.Icon icon="format-letter-spacing"/>}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                />
              )}
              name="rentDate"
          />
          {errors.rentDate?.type == 'required' && <Text style={{color:'red'}}>rentDate is required.</Text>}
          {errors.rentDate?.type == 'pattern' && <Text style={{color:'red'}}>rentDate is invalid.</Text>}
        
        <Button style={{marginBottom:20}} icon="check" mode="contained" onPress={handleSubmit(onsubmit)}>Save Rent</Button>
        <Button style={{marginBottom:20}} icon="backspace-reverse" mode="contained" onPress={clearFields}>Clear fields</Button>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableHighlight
                        style={{ ...styles.closeButton }}
                        onPress={() => {
                            closeModal();
                        }}>
                        <Text style={styles.textStyle}>Cerrar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#AF7AC5 ',
      alignItems: 'center',
      justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      closeButton: {
        marginTop: 20,
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10
      }
});
