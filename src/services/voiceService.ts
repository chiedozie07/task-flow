import { Audio } from "expo-av";

let recording: Audio.Recording | null = null;

const API_BASE_URL = process.env.EXPO_PUBLIC_TASKFLOW_API_BASE_URL;
// start recording
export async function startRecording() {
  const permission = await Audio.requestPermissionsAsync();
  if (!permission.granted) {
    throw new Error("Microphone permission required");
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  recording = new Audio.Recording();
  await recording.prepareToRecordAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  );
  await recording.startAsync();
}

// stop recording
export async function stopRecording(): Promise<string> {
  if (!recording) throw new Error("No active recording");

  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  recording = null;

  if (!uri) throw new Error("Recording failed");
  return uri;
}
// Send audio to backend
export async function transcribeRecording(fileUri: string): Promise<string[]> {
  // graceful fallback if env is missing
  if (!API_BASE_URL) {
    return fallbackTasksFromAudio();
  }

  const formData = new FormData();
  const ext = fileUri.split(".").pop() ?? "m4a";

  formData.append("audio", {
    uri: fileUri,
    name: `recording.${ext}`,
    type: "audio/mp4",
  } as any);

  try {
    const response = await fetch(`${API_BASE_URL}/api/transcribe`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      // handle quota errors with fallback tasks grafefully
      if (err?.error?.includes("quota")) {
        console.warn("Oppss! OpenAI quota exceeded, using fallback tasks. and Voice transcription requires a paid account to function.");
        return fallbackTasksFromAudio();
      }

      throw new Error(err?.error || "Voice processing failed, You've exceeded your current quota.");
    }

    const data = await response.json();
    return data.tasks ?? [];
  } catch {
    return fallbackTasksFromAudio();
  }
}

// graceful fallback tasks in case of API failure
function fallbackTasksFromAudio(): string[] {
  return ["Review tasks", "Update to-do list"];
}
