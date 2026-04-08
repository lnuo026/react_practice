import SpriteAnimation from "@/components/SpriteAnimation";
import {
  PressStart2P_400Regular,
  useFonts,
} from "@expo-google-fonts/press-start-2p";
// useMemo — cache computed results (React built-in)
import { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const TILE = 40;
const DOG_WIDTH = 100;
const DOG_HEIGHT = 100;
const SCALE = 4;
const cols = Math.ceil(width / TILE);
const rows = Math.ceil(height / TILE) + 5;

const GRASS_TILES = [
  require("@/assets/grass/tile_0000.png"),
  require("@/assets/grass/tile_0001.png"),
];

const ANIMATIONS = [
  { path: require("@/assets/dog/Akita-Idle.png"), frameCount: 10 },
  { path: require("@/assets/dog/Akita-walk.png"), frameCount: 8 },
  { path: require("@/assets/dog/Akita-run.png"), frameCount: 8 },
  { path: require("@/assets/dog/Akita-stretching.png"), frameCount: 10 },
  { path: require("@/assets/dog/Akita-lying-down.png"), frameCount: 7 },
  { path: require("@/assets/dog/Akita-licking1.png"), frameCount: 4 },
  { path: require("@/assets/dog/Akita-licking2.png"), frameCount: 4 },
  { path: require("@/assets/dog/Akita-bark.png"), frameCount: 3 },
  { path: require("@/assets/dog/Akita-itching.png"), frameCount: 2 },
  { path: require("@/assets/dog/Akita-sitting.png"), frameCount: 1 },
  { path: require("@/assets/dog/Akita-sleeping.png"), frameCount: 1 },
];

const DIALOGS = [
  "Hi, My name is Hammer!",
  "This is Nora's territory!",
  "Nora is fierce, how dare u!",
  "Private property! No trespassing!",
  "Who are you? Leave your name!",
];

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });
  const [isRed, setIsRed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [currentAnim, setCurrentAnim] = useState(
    () => ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)],
  );
  const [dogX, setDogX] = useState(
    () => Math.random() * (width - DOG_WIDTH * SCALE),
  );
  const [dogY, setDogY] = useState(() => Math.random() * (height * 0.4));
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");

  // Without useMemo:
  //   Every state change → component re-renders → grass tiles re-randomized → grass keeps flickering!
  // With useMemo:
  //   First render → compute grass layout → cache the result
  //   Later state changes → component re-renders → use cache directly → grass stays stable
  const tileMap = useMemo(
    () =>
      Array.from(
        { length: rows * cols },
        () => GRASS_TILES[Math.floor(Math.random() * GRASS_TILES.length)],
      ),
    [], // ← dependency array, [] means compute only once
  );

  const handleRefresh = () => {
    setCurrentAnim(ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)]);
    setDogX(Math.random() * (width - DOG_WIDTH * SCALE));
    setDogY(Math.random() * (height * 0.4));
  };
  const handleDogPress = () => {
    setCurrentAnim(ANIMATIONS[2]);
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 3000);
  };

  const pixelFont = fontsLoaded
    ? { fontFamily: "PressStart2P_400Regular" }
    : {};

  return (
    <View style={styles.container}>
      {/* Grass background */}
      {tileMap.map((src, i) => (
        // Image uses inline styles: left and top are dynamically calculated (each tile has a different position),
        // so they can't be hardcoded in StyleSheet — they're written directly on the element.
        <Image
          key={i}
          source={src}
          style={{
            position: "absolute",
            left: (i % cols) * TILE,
            top: Math.floor(i / cols) * TILE,
            width: TILE,
            height: TILE,
          }}
        />
      ))}

      {/* Refresh button — centered */}
      <View style={styles.refreshWrapper}>
        <Pressable
          onPress={handleRefresh}
          style={({ pressed }) => [
            styles.refreshBtn,
            pressed && { opacity: 0.5 },
          ]}
        >
          <Text style={[{ fontSize: 8, color: "white" }, pixelFont]}>
            🦴 refresh
          </Text>
        </Pressable>
      </View>

      {/* Dog house */}
      <Pressable
        onPress={() => setIsRed(!isRed)}
        style={({ pressed }) => [styles.doghouse, pressed && { opacity: 0.5 }]}
      >
        <View style={{ width: 128, height: 128, overflow: "hidden" }}>
          <Image
            source={require("@/assets/house/DOG_HOUSE.png")}
            style={{
              width: 384,
              height: 128,
              marginLeft: isRed ? -128 : 0,
            }}
            resizeMode="stretch"
          />
        </View>
      </Pressable>

      {/* 👇👇👇👇👇 Sign board */}
      <Pressable
        // onclick
        onPress={() => setShowInput(true)}
        style={({ pressed }) => [styles.sign, pressed && { opacity: 0.5 }]}
      >
        <Image
          source={require("@/assets/sign/sign.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
        {message ? (
          <Text style={[styles.signLabel, pixelFont]}>
            {message.slice(0, 6)}
          </Text>
        ) : null}
      </Pressable>

      {/* Dog */}
      <Pressable
        onPress={handleDogPress}
        style={({ pressed }) => [
          styles.dog,
          { left: dogX, top: dogY },
          Platform.OS === "web"
            ? ({
                cursor: `url('/mouse.png'),auto`,
              } as any)
            : undefined,
          pressed && { opacity: 0.7, transform: [{ scale: 0.9 }] },
        ]}
      >
        <SpriteAnimation
          imagePath={currentAnim.path}
          frameCount={currentAnim.frameCount}
          frameWidth={DOG_WIDTH}
          frameHeight={DOG_HEIGHT}
          fps={8}
          scale={SCALE}
        />
      </Pressable>

      {/* Dialog bubble */}
      {showDialog && (
        <View
          style={{
            position: "absolute",
            left: dogX + 15,
            top: dogY + 130,
            backgroundColor: "white",
            borderRadius: 8,
            padding: 8,
            borderWidth: 2,
            borderColor: "#333",
            zIndex: 10,
          }}
        >
          <Text style={[{ fontSize: 8, color: "#333" }, pixelFont]}>
            {DIALOGS[Math.floor(Math.random() * DIALOGS.length)]}
          </Text>
        </View>
      )}

      {/* 👇👇👇👇👇Message Modal */}

      <Modal visible={showInput} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowInput(false)}
        >
          <Pressable
            style={styles.modalBox}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={[styles.modalTitle, pixelFont]}>Leave a text</Text>
            <TextInput
              style={[styles.input, pixelFont]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="leave a message for Hammer..."
              maxLength={20}
              autoFocus
            />
            <Pressable
              onPress={() => {
                setMessage(inputText);
                setShowInput(false);
              }}
              //👇 press👇
              style={({ pressed }) => [
                styles.modalBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={[styles.modalBtnText, pixelFont]}>OK</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  dog: { position: "absolute", overflow: "visible" },
  doghouse: {
    position: "absolute",
    right: 70,
    bottom: 200,
  },

  sign: {
    position: "absolute",
    right: 190,
    bottom: 180,
    width: 64,
    height: 64,
    alignItems: "center",
  },

  signLabel: { fontSize: 12, color: "#daecf3", marginTop: 2 },
  refreshWrapper: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
    pointerEvents: "box-none",
  },

  // 👇
  refreshBtn: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    width: 300,
    alignItems: "center",
    gap: 16,
  },

  modalTitle: {
    fontSize: 10,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    width: "100%",
    fontSize: 8,
  },
  modalBtn: {
    backgroundColor: "#333333",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalBtnText: {
    fontSize: 10,
    color: "#ffffff",
  },
});
