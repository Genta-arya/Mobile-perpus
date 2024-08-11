import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Dimensions, Animated, StyleSheet } from 'react-native';
import image3 from '../Assets/item1.jpeg';
import image2 from '../Assets/item4.jpeg';
import image1 from '../Assets/item3.png';

const { width } = Dimensions.get('window');
const itemWidth = Math.round(width * 0.9);

const data = [{ image: image1 }, { image: image2 }, { image: image3 }];

const CustomCarousel = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % data.length;
        scrollViewRef.current.scrollTo({ x: nextIndex * itemWidth, animated: true });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {data.map((_, index) => {
          const scale = scrollX.interpolate({
            inputRange: [
              (index - 1) * itemWidth,
              index * itemWidth,
              (index + 1) * itemWidth,
            ],
            outputRange: [0.8, 1.3, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: currentIndex === index ? '#3B82F6' : 'gray',
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: event => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / itemWidth + 0.5);
        if (index !== currentIndex) {
          setCurrentIndex(index);
        }
      },
    }
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        style={{ width: itemWidth }}
        scrollEventThrottle={16}
        onScroll={onScroll}
        snapToInterval={itemWidth}
        decelerationRate="fast"
      >
        {data.map((item, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </Animated.ScrollView>
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: itemWidth,
  },
  image: {
    width: itemWidth,
    height: itemWidth * 0.6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 6,
    width: 40,
    borderRadius: 3,
    marginHorizontal: 4,
    marginTop: 10,
  },
});

export default CustomCarousel;
