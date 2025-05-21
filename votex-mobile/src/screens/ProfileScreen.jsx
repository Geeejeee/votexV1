import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import votexmlogo from '../assets/votexmlogo.png';
import styles from '../styles/ProfileScreen';

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  // This would typically come from your user authentication system or API
  const userProfile = {
    name: 'Nicole Raiv Hernandez',
    studentId: '2022300186',
    college: 'College of Information Technology and Computing',
    department: 'Information Technology',
    yearLevel: '3rd Year',
    section: 'IT38B'
  };
  
  const handleOpenMenu = () => {
    // Open menu functionality would go here
    console.log('Open menu');
  };
  
  const handleChangeProfile = () => {
    // Change profile functionality would go here
    console.log('Change profile');
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
      
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Profile Content */}
      <View style={styles.profileContent}>
        {/* Profile Picture */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage} />
        </View>
        
        {/* Change Profile Button */}
        <TouchableOpacity style={styles.changeProfileButton} onPress={handleChangeProfile}>
          <Text style={styles.changeProfileText}>Change Profile</Text>
        </TouchableOpacity>
        
        {/* User Name and ID */}
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userId}>{userProfile.studentId}</Text>
        
        {/* User Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>College:</Text>
            <Text style={styles.infoValue}>{userProfile.college}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Department:</Text>
            <Text style={styles.infoValue}>{userProfile.department}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Year Level:</Text>
            <Text style={styles.infoValue}>{userProfile.yearLevel}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Section:</Text>
            <Text style={styles.infoValue}>{userProfile.section}</Text>
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