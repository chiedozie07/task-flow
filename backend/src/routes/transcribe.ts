import { Router, Request, Response } from "express";
import multer from "multer";
import fs from "fs/promises";
import { processVoiceToTasks } from "../services/openai.js";

const router = Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // NOTE: 10MB
});

router.post("/", upload.single("audio"), async (req: Request, res: Response) => {
    // console.log("Received transcription request data:==>", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    try {
      // process audio file to extract tasks
      const tasks = await processVoiceToTasks(req.file.path);
      // console.log("Debuging, Extracted tasks =========>:", tasks);
      return res.json({ tasks });
    } catch (error) {
      console.error("Voice processing failed:", error);
      // grafully handle insufficient_quota error blocker
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "insufficient_quota"
      ) {
        return res.status(429).json({
          error: "OpenAI quota exceeded. Voice fallback activated.",
        });
      }

      return res.status(500).json({ error: "Voice processing failed" });
    } finally {
      try {
        // cleanup uploaded file
        await fs.unlink(req.file.path).catch(() => {});
      } catch {
        /* log error */
        console.warn("Failed to delete temp file:", req.file.path);
      }
    }
  }
);

export default router;
