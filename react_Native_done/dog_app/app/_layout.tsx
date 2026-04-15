// One-line summary of this file:
// Tells Expo Router "use stack navigation for the whole app, and hide the top header on the home screen".
import { Stack } from "expo-router";
//       ↑ Import the Stack component from the expo-router package

export default function RootLayoout() {
  //             ↑ Define and export a component (function) called RootLayoout
  //               Expo Router will automatically find and use it
  return (
    <Stack>
      {/* ↑ Use stack navigation — all child screens switch within this "stack" */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/*            ↑ Individual config for the index screen:
          headerShown: false = hide the top navigation bar (Header)*/}
    </Stack>
  );
}
