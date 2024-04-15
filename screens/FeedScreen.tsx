import { useEffect, useState, useCallback } from 'react';
import { Post } from '../models/Post';
import { View, StyleSheet, Text } from 'react-native';
import { fetchAllPost } from '../services/apiService';
import PostList from '../components/Posts/PostList';

const FeedScreen = () => {
  const [posts, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const getPost = useCallback(async () => {
    const data = await fetchAllPost().finally(() => setLoading(false));
    setPostData(data);
  }, []);

  useEffect(() => {
    setLoading(true);
    getPost();
  }, [getPost]);

  return (
    <View style={styles.container}>
      {loading ? <Text>loading...</Text> : <PostList data={posts} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default FeedScreen;
