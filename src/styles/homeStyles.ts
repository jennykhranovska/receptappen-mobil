import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F7F2",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#24323D",
    marginBottom: 24,
  },

  card: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D7E0E5",
    backgroundColor: "#FFFFFF",
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
    color: "#24323D",
    marginBottom: 8,
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
    color: "#24323D",
    marginBottom: 16,
  },

  recipeDetailHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#24323D",
    marginTop: 20,
    marginBottom: 8,
  },

  loading: {
    padding: 20,
  },
  recipeDetailText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 6,
    marginBottom: 16,
    color: "#46545E",
  },
  formTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#24323D",
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#24323D",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderColor: "#C7D2D9",
    backgroundColor: "#FFFFFF",
    color: "#24323D",
  },

  textArea: {
    minHeight: 140,
    textAlignVertical: "top",
  },

  button: {
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#C65D3A",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
