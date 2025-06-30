import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialCommunityIcons, } from '@expo/vector-icons';

import hstkFetch from '../../hstkFetch';

const PostItem = React.memo(({ title, id }) => (
    <View style={styles.card}>
        <MaterialCommunityIcons name="food-croissant" size={24} />

        <View style={styles.textCol}>
          <Text>{title}</Text>
          <Text>{id}</Text>
        </View>

        <AntDesign name="right" size={24} color="#151515" style={styles.chevron}/>
    </View>
));

export default function () {
    const [posts, setPosts]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        let alive = true;
        (async () => {
        try {
            const postURL  = await hstkFetch('https://jsonplaceholder.typicode.com/posts');
            const data = await postURL.json();
            if (alive) setPosts(data);
        }
        catch (err) {
            console.error('Fetch failed:', err);
        }
        finally {
            if (alive) setLoading(false);
        }
        })();
        return () => { alive = false; };
    }, []);

    const filtered = useMemo(() => {
    const caseSense = search.trim().toLowerCase();
    if (!caseSense) return posts;
    return posts.filter(p => p.title.toLowerCase().includes(caseSense));
    }, [posts, search]);

    const renderItem = useCallback(
        ({ item }) => <PostItem id={item.id} title={item.title} />,
    );

    return (
        <SafeAreaView>
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search for posts by title…"
            />

            <FlatList
                data={filtered}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={() =>
                loading ? (
                    <ActivityIndicator size={100} color="#FFBF00" />
                ) : (
                    <Text>No Results</Text>
                )
            }
            />
        </SafeAreaView>
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
    chevron: { marginLeft: 'auto' },
});
