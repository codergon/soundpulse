import { Pressable } from "../_ui/themed";
import { padding } from "helpers/styles";
import { InputRg } from "../_ui/typography";
import { View, StyleSheet } from "react-native";
import useColorScheme from "hooks/useColorScheme";
import { MagnifyingGlass, X } from "phosphor-react-native";
import { useApp } from "providers/AppProvider";

type SearchbarProps = {
  value: string;
  showMargin?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onChangeText: (text: string) => void;
};

const Searchbar = ({
  value,
  onFocus,
  placeholder,
  onChangeText,
  showMargin = true,
}: SearchbarProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#999" : "#666";
  const textColor = isDark ? "#fff" : "#000";
  const backgroundColor = isDark ? "#191919" : "#dddd";

  return (
    <View style={[styles.searchbar, { backgroundColor }]}>
      <View style={styles.searchbar__icon__cover}>
        <MagnifyingGlass
          size={16}
          weight="bold"
          color={iconColor}
          style={styles.searchbar__icon}
        />
      </View>

      <InputRg
        value={value}
        onFocus={onFocus}
        color={textColor}
        returnKeyType="search"
        returnKeyLabel="Search"
        onChangeText={onChangeText}
        style={styles.searchbar__input}
        placeholderTextColor={iconColor}
        // onSubmitEditing={() => handleSearch(value)}
        placeholder={placeholder ?? "Search for a sound..."}
      />
      {value && (
        <Pressable
          onPress={(_) => {
            onChangeText("");
            // setSearchQuery({
            //   data: null,
            //   loading: false,
            //   error: null,
            // });
          }}
          style={{
            ...styles.close__icon__cover,
            backgroundColor: isDark ? "#555" : "#d8d8d8",
          }}
        >
          <X size={13} weight="bold" color={iconColor} />
        </Pressable>
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbar: {
    flex: 1,
    borderRadius: 16,
    ...padding(5, 14),
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
  },
  searchbar__icon__cover: {
    marginRight: 12,
    backgroundColor: "transparent",
  },
  close__icon__cover: {
    width: 24,
    marginLeft: 10,
    marginRight: 0,
    aspectRatio: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar__icon: { width: 19, height: 19 },
  searchbar__input: {
    flex: 1,
    height: 34,
    fontSize: 15,
  },
});
