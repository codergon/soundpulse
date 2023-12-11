import { useState } from "react";
import { styles } from "./styles";
import SignalDetails from "./signalDetails";
import { CircleOff } from "lucide-react-native";
import { Text } from "components/_ui/typography";
import { Container } from "components/_ui/custom";
import EmptyState from "components/shared/emptyState";
import { useSettings } from "providers/SettingsProvider";
import { Export, SortAscending, SortDescending } from "phosphor-react-native";
import { FlatList, TouchableOpacity, View, useColorScheme } from "react-native";

const History = () => {
  const { signals } = useSettings();
  const isDark = useColorScheme() === "dark";
  const darkColor = isDark ? "#fff" : "#000";
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  return (
    <Container paddingTop={20} style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.headerTitle]}>
          <Text style={[styles.headerTitleText]}>Recent searches</Text>
        </View>

        <View style={[styles.headerBtns]}>
          <TouchableOpacity
            style={[styles.headerBtn, { marginRight: 20 }]}
            onPress={() => setOrder(order === "asc" ? "desc" : "asc")}
          >
            {order === "asc" ? (
              <SortAscending size={26} color={darkColor} weight="regular" />
            ) : (
              <SortDescending size={26} color={darkColor} weight="regular" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={shareScreenshot}
            style={[styles.headerBtn]}
          >
            <Export size={25} color={darkColor} weight="regular" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.content]}>
        {signals?.length === 0 ? (
          <EmptyState
            emptyIcon={<CircleOff size={34} color={"#000"} strokeWidth={1.4} />}
            data={{ message: "No saved signal yet" }}
          />
        ) : (
          <FlatList
            data={signals?.sort((a, b) => {
              if (order === "desc") {
                return a?.createdAt - b?.createdAt;
              } else {
                return b?.createdAt - a?.createdAt;
              }
            })}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const touchdown = index % 3 == 0;
              return <SignalDetails item={item} />;
            }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 14, width: "100%" }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
          />
        )}
      </View>
    </Container>
  );
};

export default History;
