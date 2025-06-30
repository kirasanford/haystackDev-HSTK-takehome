import React, { useCallback } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import localPlaceholderData from '../../localPlaceholderData';

const PostItem = React.memo(({ title, id }) => (
    // Instructions say "title should be below id visually," but screenshot shows the reverse
    // Followed the visuals of the screenshot
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
    const renderItem = useCallback(
        ({ item }) => <PostItem title={item.title} id={item.id} />,
    );

    return (
    <SafeAreaView>
        <FlatList
            data={localPlaceholderData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
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
