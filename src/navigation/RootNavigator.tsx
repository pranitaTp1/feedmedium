import FeedScreen from '../screens/FeedScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6C0345' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: '#3f2f25' },
        }}>
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{ title: 'Article' }}
        />
        <Stack.Screen name="PostDetail" component={PostDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
