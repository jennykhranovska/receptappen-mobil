import { styles } from "@/styles/homeStyles";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://10.0.2.2:5008/api/Recipes")
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍲 Smaka</Text>

      {recipes.map((recipe: any) => (
        <View key={recipe.id} style={styles.card}>
          {recipe.imagePath && (
            <Image
              source={{ uri: `http://10.0.2.2:5008${recipe.imagePath}` }}
              style={styles.recipeImage}
            />
          )}

          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text>Kategori: {recipe.category}</Text>
          <Text>Tid: {recipe.cookingTime} min</Text>
        </View>
      ))}
    </ScrollView>
  );
}
