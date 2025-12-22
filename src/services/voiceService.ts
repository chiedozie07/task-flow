import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { parseTranscriptionToTasks } from '@/utils/parseTranscription';

let recording: Audio.Recording | null = null;

/**
 * start voice recording
 */
export async function startRecording(
  onProgress?: (msg: string) => void
) {
  const permission = await Audio.requestPermissionsAsync();
  if (!permission.granted) {
    throw new Error('Microphone permission required');
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
  onProgress?.('Recording...');
}

/**
 * Stop recording and return local file URI
 */
export async function stopRecording(): Promise<string> {
  if (!recording) {
    throw new Error('No active recording');
  }

  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  recording = null;

  if (!uri) {
    throw new Error('Recording failed');
  }

  return uri;
}

/**
 * Upload audio to OpenAI Whisper and parse tasks
 * TEMPORARY (frontend only)
 * TODO: Will be moved to backend
 */
export async function transcribeRecording(
  fileUri: string,
  onProgress?: (msg: string) => void
): Promise<string[]> {
  onProgress?.('Uploading audio...');

  const formData = new FormData();
  const ext = fileUri.split('.').pop() ?? 'm4a';
  const mime = ext === 'm4a' ? 'audio/mp4' : `audio/${ext}`;

  // React Native FormData file
  formData.append('file', {
    uri: fileUri,
    name: `recording.${ext}`,
    type: mime,
  } as any);

  formData.append('model', 'whisper-1');

  const resp = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: formData,
    }
  );

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Transcription failed: ${resp.status} ${err}`);
  }

  const json = await resp.json();

  onProgress?.('Processing transcription...');
  return parseTranscriptionToTasks(json.text as string);
};