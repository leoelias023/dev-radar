import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Dev Radar',
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Profile no GitHub',
                headerStyle: {
                    borderRadius: 0,
                    backgroundColor: 'rgb(100, 31, 115)',
                }
            }
        },
    } , {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'rgb(100, 31, 115)',
                borderBottomEndRadius: 100,
                borderBottomStartRadius: 100,
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            animationEnabled: true,
            headerTransparent: false,
            headerStatusBarHeight: 5,
            headerTitleStyle: {
                marginLeft: 20,
                marginBottom: 10,
                textTransform: 'capitalize',
            }, 
        },
    })
);

export default Routes;