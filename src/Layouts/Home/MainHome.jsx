import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView, StatusBar} from 'react-native';

import Welcome from '../../components/Welcome';
import NewBookList from '../../components/NewBookList';

import CustomCarousel from '../../components/Carousel';


const MainHome = () => {

  return (
    <SafeAreaView className="  ">
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
      <ScrollView className="">
        <Welcome />

        <>
          <CustomCarousel />
          <View className="pl-4">
            <NewBookList
              type={'book'}
              title={'Terbaru'}
              subTitle={'Katalog Edisi Terbaru Kami'}
            />
            <View className="pt-2 pb-20">
              <NewBookList
                type={'Ebook'}
                title={'Buku Digital'}
                subTitle={'Katalog Edisi Terbaru Kami'}
              />
            </View>
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainHome;
