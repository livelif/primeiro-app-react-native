import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Github from './pages/Github';

const Routes = createAppContainer(
  createStackNavigator({
    Main,
    User,
    Github,
  }, {
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7159C1'
      },
      headerTintColor: '#FFF',
    }
  })
);

export default Routes;
