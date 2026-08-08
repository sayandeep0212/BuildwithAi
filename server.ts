import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API endpoint for AI Mindfulness Reflection on Journal Thoughts
  app.post('/api/ai/reflection', async (req, res) => {
    try {
      const { thought, mood } = req.body;
      if (!thought) {
        return res.status(400).json({ error: 'Thought is required' });
      }

      const prompt = `You are an empathetic, peaceful digital sanctuary mindfulness guide.
The user logged a journal thought: "${thought}" with mood: "${mood || 'reflective'}".
Provide a brief, warm, 2-sentence mindfulness insight or comforting perspective. Do not sound robotic or overly clinical. Keep it gentle, grounded, and encouraging.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      res.json({ reflection: response.text });
    } catch (error) {
      console.error('Gemini Reflection API error:', error);
      res.json({
        reflection: 'Taking time to notice your thoughts is itself a practice of self-care. Breathe deeply and honor where you are right now.',
      });
    }
  });

  // API endpoint for AI Custom Stretch Suggestion
  app.post('/api/ai/stretch', async (req, res) => {
    try {
      const { concern } = req.body;
      const prompt = `The user is feeling: "${concern || 'desk tension'}". Suggest 1 quick 2-minute physical micro-stretch or posture reset.
Return JSON with format:
{
  "title": "Short title",
  "description": "1 sentence description",
  "steps": ["Step 1", "Step 2", "Step 3"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      let data;
      try {
        data = JSON.parse(response.text || '{}');
      } catch {
        data = {
          title: 'Shoulder Drop & Deep Exhale',
          description: 'Release accumulated shoulder and jaw tension.',
          steps: ['Draw shoulders up to ears on deep inhale.', 'Hold for 3 seconds.', 'Exhale fully with a soft sigh while releasing shoulders completely.'],
        };
      }

      res.json(data);
    } catch (error) {
      console.error('Gemini Stretch API error:', error);
      res.json({
        title: 'Gentle Neck Release',
        description: 'Soothe neck and upper spine tension.',
        steps: ['Tilt right ear to right shoulder for 10 seconds.', 'Center and tilt left ear to left shoulder.', 'Breathe softly into the stretch.'],
      });
    }
  });

  // Vite middleware setup for development vs production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digital Sanctuary server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
