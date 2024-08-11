import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';

import useSearch from '../Hooks/Search/useSearch';
import { useRoute} from '@react-navigation/native';

const Search = () => {
  const {
    data,
    handleBack,
    handleLoadMore,
    handleRemoveSuggestion,
    handleReset,
    setQuery,
    setShowSuggestions,
    handleSuggestionSelect,
    handleOptionSelect,
    search,
    searchHistory,
    isFound,
    loading,
    loadingMore,
    query,
    showSuggestions,
    totalBooks,
    selectedOption,
  } = useSearch();

  const route = useRoute();

  console.log('Current Route:', route.name);

  const renderSuggestionItem = ({item}) => (
    <TouchableOpacity
      className="p-2 border-b border-gray-300 flex-row items-center justify-between"
      onPress={() => handleSuggestionSelect(item)}>
      <Text className="text-lg">{item}</Text>

      <TouchableOpacity onPress={() => handleRemoveSuggestion(item)}>
        <Icon name="times" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => (
    <View className="p-2 border-b border-gray-300">
      <Text className="text-lg font-semibold">{item.judul}</Text>
      <Text className="text-gray-600">{item.penerbit}</Text>
    </View>
  );

  return (
    <>
      <View className="pb-8 pt-2 p-4 bg-blue-600 flex flex-row items-center gap-4">
        <TouchableOpacity onPress={() => handleBack()}>
          <Icons name="arrow-left" color={'white'} size={15} />
        </TouchableOpacity>
        <Text className="font-bold text-white text-base">Temukan Buku</Text>
      </View>
      <View className="flex-1 bg-white p-4 ">
        <Text className="font-bold mb-2 text-lg text-gray-500 " style={{fontWeight:'900'}}>Kategori</Text>
        <View className="flex-row mb-4 items-center justify-center">
          <TouchableOpacity
            onPress={() => handleOptionSelect('book')}
            className={`flex-row items-center px-2 mr-4 border rounded-lg ${
              selectedOption === 'book' ? 'border-blue-500' : 'border-gray-300'
            }`}>
            <Icon
              name={selectedOption === 'book' ? 'check-square' : 'square-o'}
              size={20}
              color={selectedOption === 'book' ? '#007bff' : 'gray'}
              style={{marginRight: 8}}
            />
            <Text
              className={`text-sm ${
                selectedOption === 'book' ? 'text-blue-500' : 'text-gray-700'
              }`}>
              Buku
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOptionSelect('ebook')}
            className={`flex-row items-center px-2 border rounded-lg ${
              selectedOption === 'ebook' ? 'border-blue-500' : 'border-gray-300'
            }`}>
            <Icon
              name={selectedOption === 'ebook' ? 'check-square' : 'square-o'}
              size={20}
              color={selectedOption === 'ebook' ? '#007bff' : 'gray'}
              style={{marginRight: 8}}
            />
            <Text
              className={`text-sm ${
                selectedOption === 'ebook' ? 'text-blue-500' : 'text-gray-700'
              }`}>
              E-Buku
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center border border-gray-300 rounded-lg mb-4">
          {query.length > 0 && (
            <TouchableOpacity onPress={handleReset} className="ml-3">
              <Icon name="times" size={20} color="gray" />
            </TouchableOpacity>
          )}
          <TextInput
            placeholder="Cari Judul Buku..."
             placeholderTextColor="#888"
            value={query}
            onChangeText={text => {
              setQuery(text);
              setShowSuggestions(text.length > 0);
            }}
            className="flex-1 p-2 " style={{color:"gray"}}
          />
          <TouchableOpacity onPress={() => search(1)} style={{marginRight: 10}}>
            <Icon name="search" size={20} color="#007bff" />
          </TouchableOpacity>
        </View>

        {showSuggestions &&
          query.length > 0 &&
          data.length < 1 &&
          (searchHistory.filter(item => item.includes(query)).length > 0 ? (
            <>
              <Text className="text-center mb-2">History Pencarian</Text>
              <FlatList
                data={searchHistory.filter(item => item.includes(query))}
                renderItem={renderSuggestionItem}
                keyExtractor={(item, index) => index.toString()}
                className="border border-gray-300 rounded-lg"
              />
            </>
          ) : null)}

        {data.length > 0 && (
          <Text className="text-center mb-4 text-black">Ditemukan {totalBooks} buku</Text>
        )}

        {loading ? (
          <Text className="text-center mt-4 text-black">Loading...</Text>
        ) : (
          <>
            {data.length > 1 ? (
              <FlatList
                className={route.name === "searchs" ? "mb-20" : ""}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  loadingMore &&
                  isFound && (
                    <Text className="text-center mt-4 text-black">
                      Menampilkan lebih banyak...
                    </Text>
                  )
                }
              />
            ) : (
              <>
                {isFound && (
                  <View>
                    <Text className={'text-center text-black'}>Tidak ditemukan</Text>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Search;
