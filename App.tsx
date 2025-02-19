import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Voice from "@react-native-voice/voice";

const App = () => {
  const [recognizedText, setRecognizedText] = useState("Tap the button and start speaking");
  const [isListening, setIsListening] = useState(false);

  const startListening = async () => {
    try {

      setRecognizedText("Listening...");
      setIsListening(true);
      Voice.onSpeechResults = (event) => {
        console.log("Speech results:", event.value);
        
        setRecognizedText((event as any).value[0]);
      };
      await Voice.start("en-US");
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setRecognizedText("Error occurred. Try again.");
    }
  };

  const stopListening = async () => {
    try {
      setRecognizedText("Tap the button and start speaking");
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{recognizedText}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={isListening ? stopListening : startListening}
      >
        <Text style={styles.buttonText}>{isListening ? "Stop Listening" : "Start Speaking"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default App;
