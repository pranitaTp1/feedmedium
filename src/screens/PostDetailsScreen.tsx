import PostItem from '../components/Posts/PostItem';
import { useEffect, useCallback, useLayoutEffect, useState } from 'react';
import { fetchPostById } from '../services/apiService';
import { Post } from '../models/Post';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

const PostDetailsScreen = ({ route }) => {
  const postDetailId = route.params.id;
  const navigation = useNavigation();
  const [postDetail, setPostDetail] = useState<Post>();
  const [isLoading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: postDetail?.title || '',
    });
  }, [navigation, postDetail]);

  const getPostById = useCallback(async () => {
    const response = await fetchPostById(postDetailId).finally(() =>
      setLoading(false)
    );
    response && setPostDetail(response);
  }, [postDetailId]);

  useEffect(() => {
    setLoading(true);
    getPostById();
  }, [getPostById]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading....</Text>
      ) : (
        postDetail && <PostItem item={postDetail} setTitle={() => {}} setCounter={() => {}} setChildTimeRedendered={()=>{}}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PostDetailsScreen;
