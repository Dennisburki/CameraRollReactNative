import { View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native'
import React from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useState, useEffect } from 'react'
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";


const App = () => {

  const Permission = async () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
    title: "Storage Permission",
    message: "Storage Permission is needed to access your photos",
    buttonPositive: "OK"
  }).then(() => {
    console.log("Storage Permission Granted");
  }
  ).catch(err => {
    console.log("Storage Permission Denied");
  }
  );
}



  // async function hasAndroidPermission() {
  //   const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
  //   const hasPermission = await PermissionsAndroid.check(permission);
  //   if (hasPermission) {
  //     return true;
  //   }
  
  //   const status = await PermissionsAndroid.request(permission);
  //   return status === 'granted';
  // }
  
  // async function savePicture() {
  //   if (Platform.OS === "android" && !(await hasAndroidPermission())) {
  //     return;
  //   }
  
  //   CameraRoll.save(tag, { type, album })
  // };

  const handleButtonPress = () => {
  CameraRoll.getPhotos({
    first: 10,
    assetType: 'Photos',
  })
  .then(r => {
    (r.edges[0].node.image.uri);


  })
  .catch((err) => {
     //Error Loading Images
  });

   }
    
  const  [image, setImage] = useState("https://image.noelshack.com/fichiers/2019/30/2/1563894770-artworks-000134228809-cfnoad-t500x500.jpg");
  const [photos, setPhotos] = useState([]);

useEffect(() => {
  handleButtonPress();
  Permission();

setImage(image)
}
, [image]);


  return (
    <View style={{flex:1}}>

      <Text style={{textAlign:'center', fontWeight:'bold',fontSize:25, color:'black'}}>Profil</Text>

      <View style={{alignItems:'center'}}>
        <Image source={{uri:image}} style={{width:200,height:200, borderRadius:60}}/>
      </View>

      <TouchableOpacity
 
      onPress={
        () => {
          launchCamera({
            noData: true,
            mediaType: 'photo',
            quality: 10,
            maxWidth: 200,
            maxHeight: 200,
            saveToPhotos:true,
            storageOptions: {
              skipBackup: true,
              
            }
          }).then(image => {
            //console.log(image);
            setImage(image.assets[0].uri);
          })
          .catch(err => {
           // console.log(err);
          }
        )
        }
      }>
        <View style={{alignItems:'center'}}>
        <Text style={{
            textAlign:'center', 
            fontWeight:'bold',
            fontSize:25, 
            color:'black', 
            backgroundColor:'purple', 
            color:'white', 
            width:'50%',
            marginTop:10,
            borderRadius:7
            }}>Camera</Text>
            </View>
      </TouchableOpacity>

      <TouchableOpacity
      
      onPress={
        () => {
          launchImageLibrary({
            noData: true,
            mediaType: 'photo',
            quality: 10,
            maxWidth: 200,
            maxHeight: 200,
            saveToPhotos:true,
            storageOptions: {
              skipBackup: true,  
            }
          }).then(image => {
           // console.log(image);
            setImage(image.assets[0].uri);
          }).catch(err => {
            //console.log(err);
          }
        )
        }
      }>
        <View style={{alignItems:'center'}}>
          <Text style={{
            textAlign:'center', 
            fontWeight:'bold',
            fontSize:25, 
            color:'black', 
            backgroundColor:'purple', 
            color:'white', 
            width:'50%',
            marginTop:10,
            borderRadius:7
            }}>Galerie</Text>
        </View>
      </TouchableOpacity>

      <View>

   <Button title='jdknvke' onPress={() => {
    handleButtonPress()}}/>
    {console.log(handleButtonPress())}
   
     <ScrollView>
       {photos.map((p, i) => {
       return (
         <Image
           key={i}
           style={{
             width: 300,
             height: 100,
           }}
           source={{ uri: p.node.image.uri }}
         />
       );
     })}
     </ScrollView>
   </View>

      

    </View>
  )
}

export default App