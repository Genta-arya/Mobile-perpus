import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainSetting from '../../Layouts/Setting/MainSetting';
import OnBoarding from '../../Layouts/OnBoardings/OnBoarding';
import ListBook from '../../Layouts/Home/ListBook';

import {MyTabs} from '../Bottom/BottomNavigation';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import ikon
import Search from '../../components/Search';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="onBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="detail"
          component={ListBook}
          options={({navigation}) => ({
            headerShown: true,
            animation: 'slide_from_right',
            headerStyle: {
              backgroundColor: '#2563eb', 
            },
            headerTitle: 'Katalog Buku', 
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon
                name="search"
                size={20}
                color="#fff"
                style={{marginRight: 15}}
                onPress={() => navigation.navigate('search')} // Arahkan ke layar pencarian
              />
            ),
          })}
        />
        <Stack.Screen
          name="search"
          component={Search}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="setting"
          component={MainSetting}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
