import { Audio } from "expo-av";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useState } from "react";
import {
  bundleResourceIO,
  decodeJpeg,
  fetch,
} from "@tensorflow/tfjs-react-native";

export default function AppProvider(props: AppProviderProps) {
  const [classifying, setClassifying] = useState<boolean>(false);

  const [result, setResult] = useState("");
  const [isTfReady, setIsTfReady] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    async function loadModel() {
      const modelJson = require("../amodel/model.json");
      const modelWeights = require("../amodel/weights.bin");

      await tf.ready();
      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeights)
      );

      setModel(model);
      setIsTfReady(true);
    }

    loadModel();
  }, []);

  const classifyAudioSignal = async (audio: Audio.Recording) => {
    try {
      setClassifying(true);
      const uri = audio.getURI()!;

      // Load the audio data
      const response = await fetch(uri, {}, { isBinary: true });
      const audioData = await response.arrayBuffer();
      const audioDataArray = new Uint8Array(audioData);

      const tensor = decodeJpeg(audioDataArray);

      const prediction = (await model!.predict(tensor)) as tf.Tensor[];

      // const audioTensor = tf.tensor(audioDataArray);
      // const predictions = model.predict(audioTensor) as tf.Tensor;
    } catch (error) {
      console.log(error);
    } finally {
      setClassifying(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        classifyAudioSignal,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

interface AppContext {
  classifyAudioSignal: (audio: Audio.Recording) => Promise<void>;
}

const AppContext = React.createContext({} as AppContext);

type AppProviderProps = {
  children: React.ReactNode;
};

export function useApp() {
  const value = React.useContext(AppContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useApp must be wrapped in a <AppProvider />");
    }
  }
  return value;
}
