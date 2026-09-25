import { styles } from "@/styles/homeStyles";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetch("http://localhost:5008/api/Recipes")
        .then((response) => response.json())
        .then((data) => {
          setRecipes(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Kunde inte hämta recepten:", error);
        });
    }, []),
  );

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  const filteredRecipes = normalizedSearchTerm
    ? recipes.filter((recipe: any) =>
        [recipe.name, recipe.ingredients, recipe.category].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .split(/[\s,.;:!?()[\]{}'"/\\-]+/)
            .some((word) => word.startsWith(normalizedSearchTerm)),
        ),
      )
    : recipes;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.title}>🍲 Smaka</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/add-recipe")}
      >
        <Text style={styles.buttonText}>+ Lägg till recept</Text>
      </Pressable>

      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Sök recept..."
      />

      {filteredRecipes.map((recipe: any) => (
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
          {!recipe.imagePath && (
            <View style={styles.recipeImagePlaceholder}>
              <Text style={styles.placeholderIcon}>🍲</Text>
              <Text style={styles.placeholderText}>Ingen bild</Text>
            </View>
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
