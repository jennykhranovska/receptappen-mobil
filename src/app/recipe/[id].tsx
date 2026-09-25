import { styles } from "@/styles/homeStyles";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text } from "react-native";

export default function RecipeScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      fetch("http://localhost:5008/api/Recipes")
        .then((response) => response.json())
        .then((data) => {
          const selectedRecipe = data.find(
            (recipe: any) => recipe.id === Number(id),
          );

          setRecipe(selectedRecipe);
        })
        .catch((error) => {
          console.error("Kunde inte hämta receptet:", error);
        });
    }, [id]),
  );

  if (!recipe) {
    return <Text style={styles.loading}>Laddar recept...</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {recipe.imagePath && (
        <Image
          source={{ uri: `http://localhost:5008${recipe.imagePath}` }}
          style={styles.recipeDetailImage}
        />
      )}

      <Text style={styles.label}>Kategori: {recipe.category}</Text>
      <Text style={styles.label}>Tid: {recipe.cookingTime} min</Text>

      <Text style={styles.recipeDetailHeading}>Ingredienser</Text>
      <Text style={styles.recipeDetailText}>{recipe.ingredients}</Text>

      <Text style={styles.recipeDetailHeading}>Instruktioner</Text>
      <Text style={styles.recipeDetailText}>{recipe.instructions}</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push(`/edit-recipe/${recipe.id}`)}
      >
        <Text style={styles.buttonText}>Redigera recept</Text>
      </Pressable>
    </ScrollView>
  );
}
