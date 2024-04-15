import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { memo,useLayoutEffect, useState } from 'react';
import { Post } from '../../models/Post';

type PostItemProps = {
item: Post;
setTitle: (title:string) => void;
setCounter: (id:number) => void | undefined;
setChildTimeRedendered: (time: number) => void
}

const PostItem = ({ item, setTitle, setCounter,setChildTimeRedendered }:PostItemProps) => {
  const navigation = useNavigation();
 // const [childTimeRendered,setChildTimeRedendered] = useState(0);

  const handleNavigation = () => {
    setCounter(+item?.id);
    return navigation.navigate('PostDetail', { id: item?.id});
  };
    useLayoutEffect(() => {
    const startTime:Date = new Date();
    return () => {
       const endTime: Date = new Date();
       const timeRendered = +endTime - +startTime;
       setChildTimeRedendered(timeRendered);
       //console.log('Log a message in the child component when it re-renders due to changes in props.'+ timeRendered);
    }
  }, [setChildTimeRedendered]);

  return (
    <Pressable onPress={handleNavigation}>
      <View style={styles.itemContainer}>
        <Text style={styles.postId}>{item?.id}</Text>
        <Text style={styles.postTitle} onPress={() => setTitle(item?.title)}>
          {item?.title}
        </Text>
        <Text style={styles.postBody}>{item?.body}</Text>
         </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  postId: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 12,
    paddingBottom: 8,
  },
  postBody: {
    fontSize: 11,
  },
  itemContainer: {
    margin: 8,
    padding: 8,
    backgroundColor: '#F3D0D7',
    borderRadius: 12,
  },
});
export default memo(PostItem);
