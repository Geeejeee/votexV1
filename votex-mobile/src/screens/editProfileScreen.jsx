// src/screens/EditProfileScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { UserContext } from '../context/UserContext';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProfileScreen';
import axios from 'axios';
import votexmlogo from "../assets/votexmlogo.png";

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({ ...user });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);


  const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  } catch (error) {
    console.error("Image Picker Error:", error);
    Alert.alert("Error", "Failed to pick image");
  }
};


  const handleSave = async () => {
  setLoading(true);
  const formData = new FormData();
  formData.append('firstname', form.firstname);
  formData.append('lastname', form.lastname);
  formData.append('yearLevel', form.yearLevel);
  formData.append('section', form.section);

  if (image) {
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    formData.append('profilePicture', {
      uri: image,
      name: filename,
      type,
    });
  }

  try {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.put(`${API_BASE_URL}/api/student/profile/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const data = res.data;

    if (res.status >= 200 && res.status < 300) {
      setUser(data.updatedStudent);
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', data.message || 'Something went wrong');
    }
  } catch (err) {
    console.error('Update error:', err);
    Alert.alert('Error', 'Failed to update profile');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your media library.');
    }
  })();
}, []);

const handleOpenMenu = () => {
    console.log('Open menu');
  };
  return (
    <View style={styles.container}>
        {/* Header */}
      <View style={styles.header}>
        <Image source={votexmlogo} style={styles.logo} />
        <TouchableOpacity onPress={handleOpenMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity onPress={pickImage}>
        {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
        ) : user.profilePicture ? (
            <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
        ) : (
            <View style={styles.profileImagePlaceholder}>
            <Text>Select Image</Text>
            </View>
        )}
        </TouchableOpacity>


      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={form.firstname}
        onChangeText={(val) => setForm({ ...form, firstname: val })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={form.lastname}
        onChangeText={(val) => setForm({ ...form, lastname: val })}
      />
      <TextInput
        style={styles.input}
        placeholder="Year Level"
        value={form.yearLevel}
        onChangeText={(val) => setForm({ ...form, yearLevel: val })}
      />
      <TextInput
        style={styles.input}
        placeholder="Section"
        value={form.section}
        onChangeText={(val) => setForm({ ...form, section: val })}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={[styles.saveBtn, loading && { opacity: 0.6 }]}
        disabled={loading}
        >
        <Text style={styles.saveText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>

    </View>
  );
};

export default EditProfileScreen;
