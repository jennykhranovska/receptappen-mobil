import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5008/api/Recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Kunde inte hämta recepten:", error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍲 Smaka</Text>

      {recipes.map((recipe: any) => (
        <Text key={recipe.id}>{recipe.name}</Text>
      ))}
    </View>
  );
}
