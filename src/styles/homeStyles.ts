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

  recipeDetailContainer: {
    flex: 1,
    padding: 20,
  },

  recipeDetailImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 10,
    marginBottom: 20,
  },

  recipeDetailTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  recipeDetailHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },

  loading: {
    padding: 20,
  },
  recipeDetailText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 6,
    marginBottom: 16,
  },
});
