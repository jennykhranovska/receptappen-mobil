import { styles } from "@/styles/homeStyles";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text } from "react-native";

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍲 Smaka</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/add-recipe")}
      >
        <Text style={styles.buttonText}>+ Lägg till recept</Text>
      </Pressable>

      {recipes.map((recipe: any) => (
        <Pressable
          key={recipe.id}
          style={styles.card}
          onPress={() => router.push(`/recipe/${recipe.id}`)}
        >
          {recipe.imagePath && (
            <Image
              source={{ uri: `http://localhost:5008${recipe.imagePath}` }}
              style={styles.recipeImage}
            />
          )}

          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeDetailText}>
            Kategori: {recipe.category}
          </Text>
          <Text style={styles.recipeDetailText}>
            Tid: {recipe.cookingTime} min
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
