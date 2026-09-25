import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { styles } from "../../styles/homeStyles";

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
    console.log("saveRecipe startar");
    console.log("saveRecipe id:", id);

    const url = `http://localhost:5008/api/Recipes/${id}`;
    const body = {
      name,
      category,
      cookingTime: Number(cookingTime),
      ingredients,
      instructions,
      imagePath,
    };

    console.log("PUT-URL:", url);
    console.log("PUT-body:", body);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log("PUT response status:", response.status);

      if (!response.ok) {
        throw new Error("Kunde inte uppdatera receptet.");
      }

      router.replace({
        pathname: "/recipe/[id]",
        params: { id: String(id) },
      });
    } catch (error) {
      console.error("Fel när saveRecipe/PUT kördes:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.formTitle}>Redigera recept</Text>

      <Text style={styles.label}>Namn</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Tid i minuter</Text>
      <TextInput
        style={styles.input}
        value={cookingTime}
        onChangeText={setCookingTime}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ingredienser</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      <Text style={styles.label}>Instruktioner</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <Pressable style={styles.button} onPress={saveRecipe}>
        <Text style={styles.buttonText}>Spara ändringar</Text>
      </Pressable>
    </ScrollView>
  );
}
