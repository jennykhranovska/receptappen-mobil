import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";

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
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const addRecipe = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5008/api/Recipes", {
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
      console.log("Recept skapat:", newRecipe);
    } catch (error) {
      console.error("Fel när receptet skulle skapas:", error);
    }
  };

  return (
    <ScrollView>
      <Text>Lägg till recept</Text>
      <Text>Namn</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Receptets namn"
      />

      <Text>Kategori</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Till exempel Middag"
      />

      <Text>Tid i minuter</Text>
      <TextInput
        value={cookingTime}
        onChangeText={setCookingTime}
        placeholder="Till exempel 30"
        keyboardType="numeric"
      />

      <Text>Ingredienser</Text>
      <TextInput
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Skriv ingredienser"
        multiline
      />

      <Text>Instruktioner</Text>
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Skriv instruktioner"
        multiline
      />
      <Pressable onPress={pickImage}>
        <Text>Välj bild</Text>
      </Pressable>
      <Pressable onPress={addRecipe}>
        <Text>Spara recept</Text>
      </Pressable>
    </ScrollView>
  );
}
