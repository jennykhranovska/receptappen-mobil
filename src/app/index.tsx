import { styles } from "@/styles/homeStyles";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text } from "react-native";

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
      <Pressable onPress={() => router.push("/add-recipe")}>
        <Text>+ Lägg till recept</Text>
      </Pressable>

      {recipes.map((recipe: any) => (
        <Pressable
          key={recipe.id}
          style={styles.card}
          onPress={() => router.push(`/recipe/${recipe.id}`)}
        >
          {recipe.imagePath && (
            <Image
              source={{ uri: `http://10.0.2.2:5008${recipe.imagePath}` }}
              style={styles.recipeImage}
            />
          )}

          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text>Kategori: {recipe.category}</Text>
          <Text>Tid: {recipe.cookingTime} min</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
