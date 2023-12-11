import "react-native-gesture-handler";
import App from "../App";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import AppContextProvider from "./AppProvider";
import AccountProvider from "./AccountProvider";
import useColorScheme from "hooks/useColorScheme";
import SettingsProvider from "./SettingsProvider";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import AppToast from "components/_common/appToast";

dayjs.extend(duration);
const queryClient = new QueryClient();

const Providers = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <AccountProvider>
            <AppContextProvider>
              <MenuProvider>
                <ThemeProvider
                  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <>
                      <App />
                      <AppToast />
                    </>
                  </GestureHandlerRootView>
                </ThemeProvider>
              </MenuProvider>
            </AppContextProvider>
          </AccountProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default Providers;
