import { styles } from "@/styles/homeStyles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text } from "react-native";

export default function RecipeScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    fetch("http://10.0.2.2:5008/api/Recipes")
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
  }, [id]);

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
          source={{ uri: `http://10.0.2.2:5008${recipe.imagePath}` }}
          style={styles.recipeDetailImage}
        />
      )}

      <Text style={styles.title}>{recipe.name}</Text>

      <Text>Kategori: {recipe.category}</Text>
      <Text>Tid: {recipe.cookingTime} min</Text>

      <Text style={styles.recipeDetailHeading}>Ingredienser</Text>
      <Text style={styles.recipeDetailText}>{recipe.ingredients}</Text>

      <Text style={styles.recipeDetailHeading}>Instruktioner</Text>
      <Text style={styles.recipeDetailText}>{recipe.instructions}</Text>
    </ScrollView>
  );
}
