import Splash from "app/splash";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import Navigation from "./navigation";
import Loader from "components/_common/Loader";
import * as SplashScreen from "expo-splash-screen";
import useColorScheme from "./hooks/useColorScheme";
import { useAccount } from "providers/AccountProvider";

SplashScreen.preventAutoHideAsync();

function App() {
  const colorScheme = useColorScheme();
  const { account, isAuthenticating } = useAccount();

  const [loaded, error] = useFonts({
    "DMSans-Medium": require("assets/fonts/DMSans/DMSans-Medium.ttf"),
    "DMSans-Regular": require("assets/fonts/DMSans/DMSans-Regular.ttf"),
    "AcidGrotesk-Medium": require("assets/fonts/AcidGrotesk/AcidGrotesk-Medium.ttf"),
    "AcidGrotesk-Regular": require("assets/fonts/AcidGrotesk/AcidGrotesk-Regular.otf"),

    "NeueMontreal-Bold": require("assets/fonts/NeueMontreal/NeueMontreal-Bold.otf"),
    "NeueMontreal-Light": require("assets/fonts/NeueMontreal/NeueMontreal-Light.otf"),
    "NeueMontreal-Medium": require("assets/fonts/NeueMontreal/NeueMontreal-Medium.otf"),
    "NeueMontreal-Regular": require("assets/fonts/NeueMontreal/NeueMontreal-Regular.otf"),
  });

  // Error Boundaries to catch
  // errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (isAuthenticating || !loaded) {
    return <Loader />;
  }

  return (
    <>{!account ? <Navigation colorScheme={colorScheme} /> : <Splash />}</>
  );
}

export default App;
