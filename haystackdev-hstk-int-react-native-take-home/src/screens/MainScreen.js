import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import images from '../../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function MainScreen() {
    return (
        <View
            style={styles.screen}
        >
            <StatusBar style='light'/>
            <TopInsets />
            <View style={StyleSheet.absoluteFill}>
                <Image
                    source={images.background}
                    style={styles.headerBackground}
                />
            </View>
            <Header />
            <View
                style={styles.body}
            >
                <Button
                    text='One'
                    navTo='part-one'
                />
                <Button
                    text='Two'
                    navTo='part-two'
                />
                <Button
                    text='Three'
                    navTo='part-three'
                />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 12,
                        lineHeight: 14,
                        textAlign: 'center',
                    }}>
                        {`HAYSTACK | CUSTOM SOFTWARE, WEB & MOBILE APP SOLUTIONS`}
                    </Text>
                </View>
            </View>

        </View>
    )
}

function Button({
    navTo,
    text,
}) {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => {
                navigation.navigate(navTo);
            }}
            style={styles.button}
        >
            <View style={{
                flexDirection: 'row',
                alignSelf: 'stretch',
                alignItems: 'center',
            }}>
                <Image
                    source={images.code}
                    style={{
                        width: 38,
                        height: 38,
                    }}
                />
                <Text style={styles.buttonText}>
                    {text}
                </Text>

            </View>

            <AntDesign name='right' color='#151515' size={24} />
        </Pressable>
    )
}

function TopInsets() {
    return (
        <SafeAreaView edges={['top']} />
    )
}

function Header() {
    return (
        <View
            style={styles.header}
        >

            <View
                style={styles.headerBackgroundOverlay}
            />
            <Image
                source={images.hstkLogo}
                style={styles.image}

            />
            <Text style={styles.title}>
                Take Home Test
            </Text>
            <View
                style={styles.underline}
            />
        </View>
    )
}

const hstkGold = '#FFCF45'

function dynamicHeight(n) {
    return n / 800 * Dimensions.get('window').height;
}

const styles = StyleSheet.create({
    underline: {
        borderBottomColor: '#FFBF00',
        borderBottomColor: 3,
        alignSelf: 'stretch',
        width: '100%',
        height: 3,
        backgroundColor: '#FFBF00',
        marginTop: dynamicHeight(60),
    },
    screen: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#1a1a1a',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 46,
        marginTop: 20,
    },
    headerBackground: {
        resizeMode: 'cover',
        width: '100%',
        flex: 1,

    },
    background: {
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        opacity: 0.05,
    },
    body: {
        flex: 4,
        padding: 46,
        paddingTop: dynamicHeight(75),

    },
    image: {
        width: '74%',
        resizeMode: 'contain',
        tintColor: hstkGold,
        marginTop: dynamicHeight(24),
    },
    title: {
        color: 'white',
        marginTop: dynamicHeight(17),
        fontSize: 12,
        lineHeight: 14,
    },
    button: {
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginBottom: dynamicHeight(32),
        backgroundColor: 'white',
        opacity: 0.95
    },
    buttonText: {
        fontSize: 20,
        lineHeight: 24,
        marginLeft: 8 / 283 * (Dimensions.get('window').width - 46 * 2),
        color: '#151515',
    }
})