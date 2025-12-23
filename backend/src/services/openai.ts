import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


// initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// define TaskItem type for extracted tasks
interface TaskItem {
  title: string;
};

export async function processVoiceToTasks(filePath: string): Promise<TaskItem[]> {
  // transcribe audio file using OpenAI Whisper API 
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: 'whisper-1',
  });

  const text = transcription.text;

  // convert transcription into structured tasks using GPT-4o-mini 
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'Split the input into a JSON object: { "tasks": [{ "title": string }] }. Keep tasks short and actionable.',
      },
      { role: 'user', content: text },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) return [];

  return JSON.parse(content).tasks ?? [];
};