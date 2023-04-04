import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useState, useEffect } from 'react'
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";

const UserScreen = () => {

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

  const  picture = async () => {
  await CameraRoll.getPhotos({
    first: 10,
    assetType: 'Photos',
  })
  .then(r => {
    setPhotos(r.edges)
   })
   .catch(err => {
    console.log(err);
    }
  );
}
    
  const  [image, setImage] = useState("https://image.noelshack.com/fichiers/2019/30/2/1563894770-artworks-000134228809-cfnoad-t500x500.jpg");
  const [photos, setPhotos] = useState([]);

useEffect(() => {

  picture()
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


     {/* <ScrollView>  
       {photos.map((p, i) => {
       return (
        
         <Image
           key={i}
           style={{
             width: 150,
             height: 150,      
           }}
           source={{ uri: p.node.image.uri }}   
         />
       );
     })}

     </ScrollView> */}


    </View>
  )
}

export default UserScreen