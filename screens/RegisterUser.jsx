import React, { useState } from 'react';
import { StyleSheet, Text,  View, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useDeferredValue } from 'react'
import { TextInput, Button, Icon } from 'react-native-paper';



export const RegisterUser = ({navigation,route}) => {
    let arrayobject = route.params;
    const { control, handleSubmit,reset, formState: { errors } } = useForm({
        defaultValues: {
          nameUser: '',
          email: '',
          password: ''  
        }
      });
    const handlePress = () => {
      navigation.navigate('Contacts');
    };
    const onsubmit=(data)=>{
        arrayobject[0].push(data);
        reset();   
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
                    placeholder="Write your name"
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
              {errors.name?.type == 'required' && <Text style={{color:'red'}}>Name is required.</Text>}
              {errors.name?.type == 'maxLength' && <Text style={{color:'red'}}>Name 30 mas characters.</Text>}
              {errors.name?.type == 'minLength' && <Text style={{color:'red'}}>Name 3 mas characters.</Text>}
              {errors.name?.type == 'pattern' && <Text style={{color:'red'}}>Only letters and numbers name.</Text>}

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
      </View>
    
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#AF7AC5 ',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  
  
  
  
  
  
  