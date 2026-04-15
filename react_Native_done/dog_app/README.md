# Compare between native and web react
Same

- `import` / `export`
- JSX syntax
- `useState` / `useEffect` / `useRef`
- Props & Components
- TypeScript
- All your JavaScript logic

Different

- `<View>` - `<div>`
- `<Image source={require()}>` - `<img src="">`
- `onPress` - `onClick`
- `Pressable` - `<button>`
- `StyleSheet.create()` - CSS
- No `px`



- Pressable = clickable div / button
- onPress = onclick
- Text = web_p/span
- TextInput = web_input
- Modal = div + position: fixed



## React Native Features Used

```                                                                                
  ┌──────────────────────────┬─────────────────────────────────────────────┐
  │         Feature          │                    Where                    │    
  ├──────────────────────────┼─────────────────────────────────────────────┤
  │ Pressable + onPress      │ Refresh button, dog house, sign board, dog  │    
  ├──────────────────────────┼─────────────────────────────────────────────┤
  │ Modal                    │ Message input overlay                       │    
  ├──────────────────────────┼─────────────────────────────────────────────┤
  │ TextInput                │ Leave a message on the sign                 │   
  ├──────────────────────────┼─────────────────────────────────────────────┤    
  │ StyleSheet.create()      │ Main styles at bottom of index.tsx          │    
  ├──────────────────────────┼─────────────────────────────────────────────┤    
  │ Dimensions               │ Get screen width/height for dog positioning │    
  ├──────────────────────────┼─────────────────────────────────────────────┤   
  │ Platform.OS              │ Custom cursor on web platform               │    
  ├──────────────────────────┼─────────────────────────────────────────────┤
  │ useFonts()               │ Async font loading (Expo)                   │    
  ├──────────────────────────┼─────────────────────────────────────────────┤
  │ Image source={require()} │ Dog sprites, grass tiles, house, sign       │    
  ├──────────────────────────┼─────────────────────────────────────────────┤
  │ expo-router              │ File-based routing (app/ folder)            │    
  ├──────────────────────────┼─────────────────────────────────────────────┤
  │ SpriteAnimation          │ Custom component for sprite sheet animation │    
  └──────────────────────────┴─────────────────────────────────────────────┘

```


---             
## project detail explanin :

**index.tsx**
## **Main component:** `HomeScreen` (default export)                             
  This is the entry point of the app. Expo Router automatically renders it as   
  the home screen because it lives in the `app/` folder.                        
                                                         

## Constant
- `ANIMATIONS`   - Array of 11 dog animations (image path + frame count)
- `DIALOGS` - Array of 5 random dialog strings
- `GRASS_TILES` - Array of 2 grass tile images 
- `width` / `height` — Screen dimensions from `Dimensions.get('screen')`
- `cols` / `rows` — Number of grass tiles needed to fill the screen 


 ### States
  - `fontsLoaded` — Whether the custom font has finished loading
  - `isRed` — Toggles the dog house color
  - `showDialog` — Shows / hides the dialog bubble above the dog 
  - `showInput` — Shows / hides the message input Modal
  - `currentAnim` — The current animation (image path + frame count)
  - `dogX` — Dog's horizontal position on screen 
  - `dogY` — Dog's vertical position on screen
  - `message` — Text displayed on the sign board
  - `inputText` — Text the user is currently typing


### Count Values
- `tileMap` (useMemo) — Randomly generates the grass tile grid once and cachesit, prevents grass from re-randomizing on every render .
- `pixelFont` — Applies pixel font style only after `useFonts()` finishesloading, otherwise returns `{}` 


### Functions
- `handleRefresh` — Picks a random animation and repositions the dog
- `handleDogPress` — Switches to run animation + shows dialog bubble for 3 seconds

### Data Flow

```
User taps refresh 
→ handleRefresh()
→ updates currentAnim / dogX / dogY                                        
→ SpriteAnimation receives new props → plays new animation at new position

User taps sign board      
→ showInput = true → Modal appears
→ user types → inputText updates
→ taps OK → message = inputText, Modal closes
→ sign board displays first 6 characters of message

User taps dog 
→ handleDogPress()
→ currentAnim = ANIMATIONS[2] (run)
→ showDialog = true → dialog bubble appears
→ after 3s → showDialog = false → bubble disappears
```