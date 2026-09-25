import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="recipe/[id]"
        options={{
          title: "Recept",
        }}
      />

      <Stack.Screen
        name="edit-recipe/[id]"
        options={{
          title: "Redigera recept",
        }}
      />
    </Stack>
  );
}
