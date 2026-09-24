import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";

export default function EditRecipeScreen() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    fetch("http://localhost:5008/api/Recipes")
      .then((response) => response.json())
      .then((data) => {
        const recipe = data.find((recipe: any) => recipe.id === Number(id));

        if (recipe) {
          setName(recipe.name);
          setCategory(recipe.category);
          setCookingTime(String(recipe.cookingTime));
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
          setImagePath(recipe.imagePath ?? "");
        }
      })
      .catch((error) => {
        console.error("Kunde inte hämta receptet:", error);
      });
  }, [id]);

  const saveRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:5008/api/Recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          cookingTime: Number(cookingTime),
          ingredients,
          instructions,
          imagePath,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte uppdatera receptet.");
      }

      router.replace({
        pathname: "/recipe/[id]",
        params: { id: String(id) },
      });
    } catch (error) {
      console.error("Fel när receptet skulle uppdateras:", error);
    }
  };

  return (
    <ScrollView>
      <Text>Redigera recept</Text>

      <Text>Namn</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Kategori</Text>
      <TextInput value={category} onChangeText={setCategory} />

      <Text>Tid i minuter</Text>
      <TextInput
        value={cookingTime}
        onChangeText={setCookingTime}
        keyboardType="numeric"
      />

      <Text>Ingredienser</Text>
      <TextInput value={ingredients} onChangeText={setIngredients} multiline />

      <Text>Instruktioner</Text>
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <Pressable onPress={saveRecipe}>
        <Text>Spara ändringar</Text>
      </Pressable>
    </ScrollView>
  );
}
