import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {getBook, getEBook} from '../../service/api/GetBookData'; 
import SkeletonLoadingList from '../../components/SkeletonLoadingList';
import useDataTypeStore from '../../Zustand/DataTypeFetch';

const ListBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 
  const dataType = useDataTypeStore(state => state.dataType);

  const fetchEBooks = useCallback(async (pageNum) => {
    try {
      setLoading(true);
      const bookData = await getEBook(pageNum); 
      if (bookData.length === 0) {
        setHasMore(false);
      } else {
        setBooks(prevBooks => (pageNum === 1 ? bookData : [...prevBooks, ...bookData]));
      }
    } catch (error) {
      console.error('Failed to fetch books', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);


  const fetchBooks = useCallback(async (pageNum) => {
    try {
      setLoading(true);
      const bookData = await getBook(pageNum); 
      if (bookData.length === 0) {
        setHasMore(false);
      } else {
        setBooks(prevBooks => (pageNum === 1 ? bookData : [...prevBooks, ...bookData]));
      }
    } catch (error) {
      console.error('Failed to fetch books', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  

  useEffect(() => {
    if (dataType === "isBuku") {

      fetchBooks(page);
    } else {
      fetchEBooks(page)
    }
  }, [fetchBooks, page]);

 
  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    if (dataType === 'isBuku') {
      await fetchBooks(1);
    } else if (dataType === 'isEbuku') {
      await fetchEBooks(1);
    }
  };


  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: item.cover || 'https://via.placeholder.com/150'}}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.judul}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={
          loading && <SkeletonLoadingList />
        }
        ListEmptyComponent={ <SkeletonLoadingList />}
        contentContainerStyle={styles.flatListContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#1D4ED8']} 
            tintColor="#1D4ED8" 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 4,
  },
  flatListContent: {
    paddingHorizontal: 0,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
    width: '46%', 
  },
  image: {
    width: '100%',
    height: 256,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingBottom: 8,
    marginTop: 4,
  },
});

export default ListBook;
