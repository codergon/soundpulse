import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Colors from "constants/colors";
import useColorScheme from "hooks/useColorScheme";
import { RgText } from "components/_ui/typography";
import { ColorSchemeName, View } from "react-native";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import {
  BottomSheetParams,
  RootTabParamList,
  RootStackParamList,
} from "typings/navigation";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  ClockCounterClockwise,
} from "phosphor-react-native";

// Screens
import History from "app/history";
import Discover from "app/discover";
import Settings from "app/settings";
import SoundDetails from "app/modals/soundDetails";
import SoundPreview from "app/modals/soundPreview";

// Navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomSheet = createBottomSheetNavigator<BottomSheetParams>();

// BottomTab Icons
function TabBarIcon(props: { label: string; color: string; focused: boolean }) {
  const iconSize = 22;
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        gap: 4,
        flex: 1,
        minWidth: 40,
        paddingTop: 10,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {props.label === "discover" ? (
        <MagnifyingGlass
          weight={props?.focused ? "fill" : "regular"}
          size={iconSize}
          color={props?.color}
        />
      ) : props.label === "history" ? (
        <ClockCounterClockwise
          weight={props?.focused ? "fill" : "regular"}
          size={iconSize}
          color={props?.color}
        />
      ) : (
        <SlidersHorizontal
          weight={props?.focused ? "fill" : "regular"}
          size={iconSize}
          color={props?.color}
        />
      )}

      <RgText
        style={{
          display: props?.label === "wallet" ? "none" : "flex",

          fontSize: 10,
          color: props?.focused ? Colors[colorScheme].tint : "#89919E",
        }}
      >
        {props?.label?.charAt(0).toUpperCase() + props?.label?.slice(1)}
      </RgText>
    </View>
  );
}

// Navigation Container
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <BottomSheetNavigator />
    </NavigationContainer>
  );
}

//  Root Navigator
function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

// Bottom Sheet Navigator
const BottomSheetNavigator = () => {
  return (
    <BottomSheet.Navigator
      initialRouteName="Root"
      screenOptions={{
        backdropComponent: (props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        ),
      }}
    >
      <BottomSheet.Screen name="Root" component={RootNavigator} />
      <BottomSheet.Screen
        name="soundDetails"
        component={SoundDetails}
        options={{
          handleComponent: null,
          snapPoints: [300],
        }}
      />

      <BottomSheet.Screen
        name="soundPreview"
        component={SoundPreview}
        options={{
          handleComponent: null,
          snapPoints: [300],
        }}
      />
    </BottomSheet.Navigator>
  );
};

// Bottom Tab Navigator
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="discover"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 88,
          borderTopWidth: 0.5,
          borderTopColor: Colors[colorScheme].tabBorder,
          backgroundColor: Colors[colorScheme].tabBackground,
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
      }}
    >
      <BottomTab.Screen
        name="history"
        component={History}
        options={() => ({
          tabBarLabel: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon label="history" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="discover"
        component={Discover}
        options={() => ({
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon label="discover" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="settings"
        component={Settings}
        options={() => ({
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon label="settings" color={color} focused={focused} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
