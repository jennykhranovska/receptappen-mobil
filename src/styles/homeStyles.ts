import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 10,
  },

  recipeImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "cover",
  },

  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
