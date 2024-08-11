import React from 'react';
import { View, Text, Image, Button, SafeAreaView, ScrollView } from 'react-native';

const OnBoarding = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-blue-100 py-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="flex items-center justify-center">
          {/* Header */}
          <Text className="text-4xl font-bold text-blue-700 mb-6">
            SMK2 Ketapang
          </Text>
          <Text className="text-2xl font-semibold text-blue-600 mb-4">
            Perpustakaan e-Library
          </Text>

          {/* Image */}
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }}
            className="w-80 h-80 mb-6 rounded-lg shadow-lg"
            resizeMode="cover"
          />

          {/* Description */}
          <View className="p-4 bg-white rounded-lg shadow-md w-full mb-6">
            <Text className="text-lg text-gray-800 text-center">
              Selamat datang di aplikasi Perpustakaan e-Library SMK2 Ketapang. Temukan buku, akses materi pendidikan, dan manfaatkan berbagai fitur kami untuk meningkatkan pengalaman belajar Anda.
            </Text>
          </View>

          {/* Action Button */}
          <Button
            title="Get Started"
            color="#1D4ED8" // Tailwind's blue-700 color
            onPress={() => navigation.navigate('Tabs')} // Navigasi ke halaman utama atau halaman berikutnya
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoarding;
