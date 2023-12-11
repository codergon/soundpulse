import { RgText } from "components/_ui/typography";
import useColorScheme from "hooks/useColorScheme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface EmptyStateProps {
  error?: any;
  data?: {
    message?: string;
    loadingText?: string;
    errorMessage?: string;
  };
  emptyIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const EmptyState = ({
  isLoading,
  error,
  errorIcon,
  data,
  icon,
  emptyIcon,
}: EmptyStateProps) => {
  const isDark = useColorScheme() === "dark";
  const emptyColor = isDark ? "#fff" : "#000";

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: 84,
        },
      ]}
    >
      <View style={{ gap: 12, flexDirection: "column", alignItems: "center" }}>
        {error && !isLoading
          ? errorIcon
          : !error && !isLoading
          ? emptyIcon
          : icon}
        <RgText style={{ fontSize: 18, color: emptyColor }}>
          {isLoading
            ? data?.loadingText || "Loading..."
            : error
            ? data?.errorMessage || error?.message || "An error occured"
            : data?.message ?? "Nothing to see here"}
        </RgText>
        {isLoading && (
          <View style={{}}>
            <ActivityIndicator size={"small"} color={emptyColor} />
          </View>
        )}
      </View>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
});
