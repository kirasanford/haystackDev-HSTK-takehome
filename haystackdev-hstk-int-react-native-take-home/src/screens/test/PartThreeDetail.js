import React, { useState, useEffect, useCallback, memo } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import urls from '../../urls';
import hstkFetch from '../../hstkFetch';

export default function PartThreeDetail({ route }) {
  const { id } = route.params;

  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const CommentItem = memo(({ id: commentId, name, email, body, onHide }) => (
      <View>
        <Text> {name} </Text>
        <Text> {`<${email}>`} </Text>
        <Text> {body} </Text>

        <TouchableOpacity onPress={() => onHide(commentId)}>
            <Text style={styles.hideBtn}> Hide </Text>
        </TouchableOpacity>
      </View>
  ));

  const handleHideComment = useCallback((idToHide) => {
    setComments(prev => prev.filter(c => c.id !== idToHide));
  },
  []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const postURL  = await hstkFetch(`${urls.posts}/${id}`);
        const dataPost = await postURL.json();
        if (alive) setPost(dataPost);
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        if (alive) setLoadingPost(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const commentURL  = await hstkFetch(`${urls.posts}/${id}/comments`);
        const dataComments = await commentURL.json();
        if (alive) setComments(dataComments);
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        if (alive) setLoadingComments(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const keyExtractor = useCallback(item => item.id.toString(), []);

  const renderComment = useCallback(
    ({ item }) => (
        <CommentItem
            id={item.id}
            name={item.name}
            email={item.email}
            body={item.body}
            onHide={handleHideComment}
        />
    ),
   [handleHideComment]
  );

  if (loadingPost || loadingComments) return <ActivityIndicator size={100} color="#FFBF00"/>;

  return (
    <FlatList
      data={comments}
      keyExtractor={keyExtractor}
      renderItem={renderComment}
      ListHeaderComponent={() => (
        <View>
          <Text> {post.title} </Text>
          <Text> {post.body} </Text>
          <Text> {comments.length} comment{comments.length !== 1 && 's'} </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    textCol: {
        width: '50%',
    },
    chevron: {
        marginLeft: 'auto'
    },
    hideBtn: {
        color: '#FF0000'
    }
});

// tried the bonus challenge, but could not get it to work :(
