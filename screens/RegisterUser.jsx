import React, { useState } from 'react';
import { StyleSheet, Text,  View, Alert, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Icon } from 'react-native-paper';



export const RegisterUser = ({navigation,route}) => {
    let arrayobject = route.params[0];
    console.log("arrayobject ", arrayobject);
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const { control, handleSubmit,reset, formState: { errors } } = useForm({
        defaultValues: {
          email: '',
          nameUser: '',
          fullName:'',
          password: ''  
        }
      });
    const handlePress = () => {
      navigation.navigate('Contacts');
    };
    const showModal = () => {
      setModalVisible(true);
    }
    const closeModal = () => {
      setModalVisible(false);
    }
    const onsubmit=(data)=>{
      console.log("DATA:  ", data);
        let findUser = arrayobject.find(usr => usr.name === data.nameUser || usr.email === data.email )
        if (findUser === undefined){
          setMessage('User registred');
          showModal();
          arrayobject.push(data);
          reset(); 
        }else{
          setMessage('User exist, try again');
          showModal();
          reset(); 
        }
    }

    return (
        <View style={styles.container}> 
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
              {errors.nameUser?.type == 'minLength' && <Text style={{color:'red'}}>Name 3 min characters.</Text>}
              {errors.nameUser?.type == 'pattern' && <Text style={{color:'red'}}>Only letters and numbers name.</Text>}
          <Controller 
              control={control}
              rules={{
                  required: true,
                  maxLength:30,
                  minLength:10,
                  pattern:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{margin:20, borderRadius:10}}
                    placeholder="Write your user full name"
                    label="Full name"
                    mode='outlined'
                    left={<TextInput.Icon icon="clipboard-account"/>}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                  )}
                  name="fullName"
              />
              {errors.fullName?.type == 'required' && <Text style={{color:'red'}}>Name is required.</Text>}
              {errors.fullName?.type == 'maxLength' && <Text style={{color:'red'}}>Name 30 max characters.</Text>}
              {errors.fullName?.type == 'minLength' && <Text style={{color:'red'}}>Name 3 min characters.</Text>}
              {errors.fullName?.type == 'pattern' && <Text style={{color:'red'}}>Only letters and numbers name.</Text>}

          <Controller
                control={control}
                rules={{
                  required: true,
                  pattern:/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{margin:20, borderRadius:10}}
                  label="E-mail"
                  placeholder='Write your email'
                  mode='outlined'
                  left={<TextInput.Icon icon="email-box"/>}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                  />
                )}
                name="email"
            />
            {errors.email?.type == 'required' && <Text style={{color:'red'}}>E-mail is required.</Text>}
            {errors.email?.type == 'pattern' && <Text style={{color:'red'}}>E-mail is invalid.</Text>}
          <Controller
                control={control}
                rules={{
                  required: true,
                  maxLength: 8,
                  pattern: /^[\w\s]{8,}$/
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{margin:20, borderRadius:10}}
                  placeholder='exmple: duvan112'
                  secureTextEntry={true}
                  label="password"
                  mode='outlined'
                  left={<TextInput.Icon icon="eye"/>}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                  />
                )}
                name="password"
            />
            {errors.password?.type == 'required' && <Text style={{color:'red'}}>password is required.</Text>}
            {errors.password?.type == 'maxLength' && <Text style={{color:'red'}}>Max 8 characters.</Text>}
            {errors.password?.type == 'pattern' && <Text style={{color:'red'}}>password is invalid, only letters and numbers.</Text>}
          
          <Button icon="login" mode="contained" onPress={handleSubmit(onsubmit)}>Resgiter</Button>
          <TouchableOpacity onPress={handlePress}>
            <Text>Back</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(false);}}>
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

  
  
  
  
  
  
  