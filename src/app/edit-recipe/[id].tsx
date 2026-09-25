import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
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

  const deleteImage = () => {
    Alert.alert("Vill du ta bort bilden?", undefined, [
      {
        text: "Avbryt",
        style: "cancel",
      },
      {
        text: "Ta bort",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(
              `http://localhost:5008/api/Recipes/${id}/image`,
              {
                method: "DELETE",
              },
            );

            if (!response.ok) {
              throw new Error("Kunde inte ta bort bilden.");
            }

            setImagePath("");
          } catch (error) {
            console.error("Fel när bilden skulle tas bort:", error);
          }
        },
      },
    ]);
  };

  const pickAndUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    try {
      const selectedImage = result.assets[0];
      const formData = new FormData();
      const file = new File(selectedImage.uri);

      formData.append("image", file);

      const response = await fetch(
        `http://localhost:5008/api/Recipes/${id}/image`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Kunde inte ladda upp bilden.");
      }

      const recipesResponse = await fetch("http://localhost:5008/api/Recipes");
      const recipes = await recipesResponse.json();
      const updatedRecipe = recipes.find(
        (recipe: any) => recipe.id === Number(id),
      );

      setImagePath(updatedRecipe?.imagePath ?? "");
    } catch (error) {
      console.error("Fel när bilden skulle laddas upp:", error);
    }
  };

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

      Alert.alert("Klart!", "Ändringarna har sparats!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error("Fel när saveRecipe/PUT kördes:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
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

      {imagePath && <Text style={styles.label}>✓ Receptet har en bild</Text>}

      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, styles.buttonInRow]}
          onPress={saveRecipe}
        >
          <Text style={styles.buttonText}>Spara ändringar</Text>
        </Pressable>
        {imagePath && (
          <Pressable
            style={[styles.button, styles.buttonInRow]}
            onPress={deleteImage}
          >
            <Text style={styles.buttonText}>Ta bort bild</Text>
          </Pressable>
        )}
        {!imagePath && (
          <Pressable
            style={[styles.button, styles.buttonInRow]}
            onPress={pickAndUploadImage}
          >
            <Text style={styles.buttonText}>Lägg till bild</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}
