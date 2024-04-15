import { useCallback, useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import PostItem from './PostItem';
import { Post } from '../../models/Post';

const ITEM_HEIGHT = 70;
type postListProps = {
data: Post[]
}

const PostList = ({ data }:postListProps) => {
  const [title, setTitle] = useState<string>('Blank');
  const [isBlue, setIsBlue] = useState(false);
  const [counter, setCounter] = useState<number>(0);
  const [timeFuncRendered, setTimeFuncRedendered] = useState(0);
  const [childTimeRendered,setChildTimeRedendered] = useState(0);

  const memoizedCallback = useCallback((title:string) => {

    const startTime: Date = new Date();
    for (let i = 0; i <= 100000; i++) {}
     const endTime: Date = new Date();
       const timeRendered = +endTime - +startTime;
       setTimeFuncRedendered(timeRendered);
      setTitle(title);
  }, []);

  const multipliedCounter = () => {
    for (let i = 0; i <= 100000; i++) {}
    return counter * 10;
  };
  const memoizedMulitpliedCount = useMemo(multipliedCounter, [counter]);

  const renderPostItem = ({ item }:{item: Post}) => {
    return (
      <PostItem
        item={item}
        setTitle={memoizedCallback}
        setCounter={setCounter}
        setChildTimeRedendered={setChildTimeRedendered}
      />
    );
  };
  const keyExtractor = (item:Post) => `post-${item?.id}`;

  const getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <View style={styles.rootContainer}>
      <View style={styles.topContainer}>
        <Text
          style={[styles.timeRender, { color: isBlue ? '#6420AA' : '#1679AB' }]}
          onPress={() => setIsBlue(!isBlue)}>
          {'\n'}The time taken for the heavy computation function to run on each render = {timeFuncRendered}
          <Text style={styles.timeRenderNoteHighlight}>{'\n'}[Note: click near title of item]</Text>
          {'\n'}{'\n'}Updated Title: {title}
        </Text>

        <Text
          style={[styles.counter, { color: isBlue ? '#DC6B19' : '#1679AB' }]}
          onPress={() => setIsBlue(!isBlue)}>
          {'\n'}Heavy computation memoized Counter: {(memoizedMulitpliedCount)}{'\n'}
        </Text>

        <Text style={styles.timeRender}> {'\n'}The child component when it re-renders due to changes in props. = {childTimeRendered}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderPostItem}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        removeClippedSubviews
      />
    </View>
  );
};
const styles = StyleSheet.create({
  rootContainer:{
    backgroundColor: '#BED7DC'
  },
  topContainer: {
    borderWidth:5,
    borderColor: '#D20062',
    padding:16,
    fontSize: 11,
  },
  counter: {
    color:'#6420AA'
  },
  timeRender: {
    color:'#6420AA',
    borderWidth:5,
    borderColor:'#FFFC9B',
    padding:8
  },
  timeRenderNoteHighlight: {
    color:'red'
  }
});
export default PostList;
