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

  addFormContent: {
    paddingBottom: 32,
  },

  addFormTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#24323D",
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#24323D",
    marginBottom: 8,
  },

  addLabel: {
    fontSize: 15,
    marginBottom: 5,
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

  addInput: {
    padding: 10,
    marginBottom: 10,
  },

  textArea: {
    minHeight: 140,
    textAlignVertical: "top",
  },

  addTextArea: {
    minHeight: 112,
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

  buttonRow: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },

  buttonInRow: {
    width: "48%",
    alignSelf: "stretch",
    paddingHorizontal: 6,
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  imageStatus: {
    marginTop: 2,
    marginBottom: 4,
    fontSize: 14,
    color: "#8F4A35",
  },

  addButtonRow: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    alignItems: "stretch",
  },

  addSecondaryButton: {
    flex: 0.82,
    alignSelf: "stretch",
    paddingHorizontal: 8,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C65D3A",
    backgroundColor: "transparent",
  },

  addSecondaryButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#C65D3A",
  },

  addPrimaryButton: {
    flex: 1.18,
    alignSelf: "stretch",
    paddingHorizontal: 8,
    justifyContent: "center",
  },

  deleteButton: {
    marginTop: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#A94442",
    borderRadius: 8,
    backgroundColor: "#F8E7E1",
  },

  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A94442",
  },
});
