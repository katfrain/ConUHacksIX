import { Text, View } from "react-native";
import createItem from "@/Services/Items/MarketItem";

export default function Index() {
    createItem()
        .catch((error) => console.error('Error creating item:', error));
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
