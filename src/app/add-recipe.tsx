import { styles } from "@/styles/homeStyles";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput } from "react-native";
export default function AddRecipeScreen() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const addRecipe = async () => {
    try {
      const response = await fetch("http://localhost:5008/api/Recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category: category,
          cookingTime: Number(cookingTime),
          ingredients: ingredients,
          instructions: instructions,
          imagePath: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte lägga till receptet.");
      }

      const newRecipe = await response.json();
      if (image) {
        const formData = new FormData();

        const file = new File(image.uri);

        formData.append("image", file);

        const imageResponse = await fetch(
          `http://localhost:5008/api/Recipes/${newRecipe.id}/image`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!imageResponse.ok) {
          throw new Error(
            "Receptet skapades, men bilden kunde inte laddas upp.",
          );
        }
      }
      console.log("Recept skapat:", newRecipe);
      Alert.alert("Klart!", "Receptet har sparats!", [
        {
          text: "OK",
          onPress: () => router.replace("/"),
        },
      ]);
    } catch (error) {
      console.error("Fel när receptet skulle skapas:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.formTitle}>Lägg till recept</Text>
      <Text style={styles.label}>Namn</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Receptets namn"
      />

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Till exempel Middag"
      />

      <Text style={styles.label}>Tid i minuter</Text>
      <TextInput
        style={styles.input}
        value={cookingTime}
        onChangeText={setCookingTime}
        placeholder="Till exempel 30"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ingredienser</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Skriv ingredienser"
        multiline
      />

      <Text style={styles.label}>Instruktioner</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Skriv instruktioner"
        multiline
      />
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Välj bild</Text>
      </Pressable>
      {image && <Text>✓ Bild vald</Text>}
      <Pressable style={styles.button} onPress={addRecipe}>
        <Text style={styles.buttonText}>Spara recept</Text>
      </Pressable>
    </ScrollView>
  );
}
