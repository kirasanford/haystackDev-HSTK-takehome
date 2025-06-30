import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import hstkFetch from '../../hstkFetch';
import urls from '../../urls';
import PartThreeDetail from './PartThreeDetail';

const PostItem = React.memo(({ title, id, onPress }) => (
  <TouchableOpacity onPress={() => onPress(id)} style={styles.card}>
    <MaterialCommunityIcons name="food-croissant" size={24} />
    <View style={styles.textCol}>
      <Text>{title}</Text>
      <Text>{id}</Text>
    </View>
    <AntDesign name="right" size={24} color="#151515" style={styles.chevron} />
  </TouchableOpacity>
));

function PartThreeListScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const postURL = await hstkFetch(urls.posts);
        const data = await postURL.json();
        if (alive) setPosts(data);
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    const caseSense = search.trim().toLowerCase();
    return !caseSense ? posts : posts.filter(p => p.title.toLowerCase().includes(caseSense));
  }, [posts, search]);

  const handlePostPress = useCallback(
    (id) => navigation.navigate('Posts', { id }),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <PostItem
        id={item.id}
        title={item.title}
        onPress={handlePostPress}
      />
    ),
    [handlePostPress]
  );

  return (
    <SafeAreaView>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search posts by title…"
      />
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() =>
          loading
            ? <ActivityIndicator size={100} color="#FFBF00" />
            : <Text>No results</Text>
        }
      />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator initialRouteName="List">
      {/* Couldn't figure out a nicer way to do this */}
      <Stack.Screen name=" " component={PartThreeListScreen}
        options={{ headerLeft: () => null, gestureEnabled: false, }}
      />
      <Stack.Screen name="Posts" component={PartThreeDetail} />
    </Stack.Navigator>
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
});
