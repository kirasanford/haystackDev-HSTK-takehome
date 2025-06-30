import { createStackNavigator } from "@react-navigation/stack";
import PartOne from "./test/PartOne";
import PartThree from "./test/PartThree";
import PartTwo from "./test/PartTwo";
import MainScreen from "./MainScreen";

const Stack = createStackNavigator();


export default function Navigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                component={MainScreen}
                name='main'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                component={PartOne}
                name='part-one'
            />
            <Stack.Screen 
                component={PartTwo}
                name='part-two'
            />
            <Stack.Screen 
                component={PartThree}
                name='part-three'
            />
        </Stack.Navigator>
    )
}