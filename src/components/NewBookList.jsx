import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {newBook, newEBook} from '../service/api/GetBookData'; // Pastikan jalur impor sesuai dengan struktur proyek Anda
import {useNavigation} from '@react-navigation/native';
import SkeletonLoading from './skeletonLoading';

import Indicator from './Indicator';
import useImageLoadingStore from '../Zustand/ImageLoading';
import useDataTypeStore from '../Zustand/DataTypeFetch';

const NewBookList = props => {
  const {type, title, subTitle} = props;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const imageLoading = useImageLoadingStore(state => state.imageLoading);
  const handleImageLoadStart = useImageLoadingStore(
    state => state.handleImageLoadStart,
  );
  const handleImageLoadEnd = useImageLoadingStore(
    state => state.handleImageLoadEnd,
  );

  const {setDataType} = useDataTypeStore(state => ({
    setDataType: state.setDataType,
  }));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookData = type === 'book' ? await newBook() : await newEBook();
        setBooks(bookData);
      } catch (error) {
        console.error('Failed to fetch books', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [type]);

  const renderItem = ({item}) => (
    <View className="pt-4 mr-2">
      {imageLoading && <Indicator />}
      <Image
        source={{uri: item.cover || 'https://via.placeholder.com/150'}}
        className="w-40 h-52 rounded-lg mb-2"
        resizeMode="cover"
        onLoadStart={handleImageLoadStart}
        onLoadEnd={handleImageLoadEnd}
      />
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 ">
      {loading ? (
        <>
          <View className="pb-4 pt-4">
            <Text className="text-lg font-bold">{title}</Text>
            <Text className="text-xs text-gray-600">
              {subTitle}
            </Text>
          </View>
          <FlatList
            className="pb-4 pr-2 mr-2"
            data={[...Array(5).keys()]}
            renderItem={() => <SkeletonLoading />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 6}} />}
          />
        </>
      ) : (
        <>
          <View className="py-4 pt-4 flex flex-row justify-between pr-4">
            <View>
              <Text className="text-lg font-bold text-black " style={{fontWeight:"bold"}}>{title}</Text>
              <Text className="text-xs text-gray-600">{subTitle}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setDataType(type === 'book' ? 'isBuku' : 'isEBook');
                navigation.navigate('detail');
              }}
              className="justify-center">
              <Text className="text-blue-500 font-bold">Lihat semua</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default NewBookList;
