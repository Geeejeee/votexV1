// src/screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import votexmlogo from '../assets/votexmlogo.png';
import styles from '../styles/ProfileScreen';
import { UserContext } from '../context/UserContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const handleOpenMenu = () => {
    console.log('Open menu');
  };

  const handleChangeProfile = () => {
    navigation.navigate('EditProfile');
    console.log('Change profile');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading user profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={votexmlogo} style={styles.logo} />
        <TouchableOpacity onPress={handleOpenMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Content */}
        <View style={styles.profileContent}>
          {/* Profile Picture */}
          <View style={styles.profileImageContainer}>
            <Image
              source={user.profilePicture ? { uri: user.profilePicture } : require('../assets/votexmlogo.png')}
              style={styles.profileImage}
            />

          </View>

          {/* Change Profile Button */}
          <TouchableOpacity style={styles.changeProfileButton} onPress={handleChangeProfile}>
            <Text style={styles.changeProfileText}>Change Profile</Text>
          </TouchableOpacity>

          {/* User Name and ID */}
          <Text style={styles.userName}>{user.firstname} {user.lastname}</Text>
          <Text style={styles.userId}>{user.idNumber}</Text>

          {/* User Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>College:</Text>
              <Text style={styles.infoValue}>{user.college.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Department:</Text>
              <Text style={styles.infoValue}>{user.department.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Year Level:</Text>
              <Text style={styles.infoValue}>{user.yearLevel}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Section:</Text>
              <Text style={styles.infoValue}>{user.section}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>2025 © Votex Solutions</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
