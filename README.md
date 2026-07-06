# 🎬 AI Video Assistant Agent With RAG

Turn videos, audio recordings, or YouTube links into structured meeting notes, action items, decisions, open questions, downloadable reports, and a transcript-grounded chat assistant.

This project combines a **FastAPI backend**, a **React + Vite frontend**, local/audio transcription tools, **Mistral AI** for reasoning, and **ChromaDB** for RAG-powered question answering.

## 🎥 Demo Videos
**Note: The UI has been updated, so the demo video may not reflect the current interface.**

- 📺 **[Demo 1 - Process a YouTube URL (English)](https://youtu.be/TImmOzzYG6I)**
- 📺 **[Demo 2 - Process a YouTube URL (Hindi/Hinglish)](https://youtu.be/Ts86gAvU4oE)**
- 📺 **[Demo 3 - Upload a Local Audio/Video File](https://youtu.be/H6tMxXC5kV0)**

## ✨ Features

- 🎥 Upload local audio/video files or paste a YouTube URL
- 🗣️ Transcribe English audio with local Whisper
- 🇮🇳 Transcribe/translate Hinglish with Sarvam AI
- 🧠 Generate a concise title and meeting summary with Mistral
- ✅ Extract action items, owners, and deadlines
- 🔑 Identify key decisions
- ❓ Collect open questions and follow-ups
- 💬 Chat with the meeting using RAG over the transcript
- 📄 Export results as PDF or DOCX
- ⚡ Track processing progress in real time with Server-Sent Events

## 🧱 Tech Stack

### Backend

- Python 3.10+
- FastAPI
- Uvicorn
- OpenAI Whisper
- Sarvam AI speech-to-text-translate API
- LangChain
- Mistral AI
- ChromaDB
- Sentence Transformers
- yt-dlp
- pydub + FFmpeg
- ReportLab and python-docx

### Frontend

- React 18
- Vite
- Tailwind CSS
- Axios
- Framer Motion
- Lucide React
- React Markdown

## 📁 Project Structure

```text
.
├── core/
│   ├── extractor.py       # Action items, decisions, questions
│   ├── RAG_engine.py      # Transcript-grounded chat chain
│   ├── summarizer.py      # Title and summary generation
│   ├── transcriber.py     # Whisper/Sarvam transcription routing
│   └── vector_store.py    # ChromaDB vector store setup
├── utils/
│   └── audio_processor.py # YouTube download, conversion, chunking
├── frontend/
│   ├── src/
│   │   ├── components/    # Upload, progress, results, chat UI
│   │   ├── lib/api.js     # API client helpers
│   │   └── App.jsx
│   └── package.json
├── downloads/             # Uploaded/downloaded audio files
├── generated/             # PDF/DOCX exports
├── vector_db/             # Chroma vector database
├── main.py                # CLI pipeline entry point
├── server.py              # FastAPI backend
├── requirements.txt
└── Dockerfile
```

## 🏗️ Architecture

```
User Upload / YouTube URL
            │
            ▼
     Audio Extraction (FFmpeg)
            │
            ▼
 Whisper / Sarvam Transcription
            │
            ▼
 Mistral AI Summarization & Extraction
            │
            ▼
 Transcript → ChromaDB
            │
            ▼
      RAG-powered Chat
            │
            ▼
      PDF / DOCX Export
```

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
MISTRAL_API_KEY=your_mistral_api_key
SARVAM_API_KEY=your_sarvam_api_key
WHISPER_MODEL=base
SARVAM_STT_MODEL=saaras:v3

# Optional
FRONTEND_ORIGIN=http://localhost:5173
```

Notes:

- `MISTRAL_API_KEY` is required for summaries, extraction, and chat.
- `SARVAM_API_KEY` is required only when using the `hinglish` language option.
- `WHISPER_MODEL` defaults to `base`.

## ⚙️ Prerequisites

Install these before running the app:

- Python 3.10 or newer
- Node.js 18 or newer
- FFmpeg available on your system `PATH`

FFmpeg is required by `pydub`, `yt-dlp`, and audio conversion.

## 🚀 Backend Setup

From the project root:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Start the API server:

```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/api/health
```

## 🖥️ Frontend Setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:8000`.

## 🧪 CLI Usage

You can also run the pipeline from the terminal:

```bash
python main.py
```

You will be prompted for:

- A YouTube URL or local media file path
- Language: `english` or `hinglish`

After processing, the CLI lets you chat with the transcript.

## 🔌 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check whether the backend is running |
| `POST` | `/api/jobs` | Start a processing job with a file or YouTube URL |
| `GET` | `/api/jobs/{job_id}` | Get current job status/result |
| `GET` | `/api/jobs/{job_id}/stream` | Subscribe to real-time job progress |
| `POST` | `/api/jobs/{job_id}/chat` | Ask a question about the processed transcript |
| `GET` | `/api/jobs/{job_id}/download?fmt=pdf` | Download PDF report |
| `GET` | `/api/jobs/{job_id}/download?fmt=docx` | Download DOCX report |

## 🧭 How The Pipeline Works

1. 📥 Accepts a local media file or YouTube URL
2. 🎧 Converts media to WAV audio
3. ✂️ Splits audio into chunks
4. 🗣️ Transcribes chunks with Whisper or Sarvam
5. 🧠 Generates title, summary, action items, decisions, and questions
6. 🗃️ Stores transcript chunks in ChromaDB
7. 💬 Answers user questions with transcript-grounded RAG
8. 📄 Exports results to PDF or DOCX

## 🐳 Docker

There is a `Dockerfile` included for the backend image:

```bash
docker build -t ai-video-assistant .
```

Run the container:

```bash
docker run --env-file .env -p 7860:7860 ai-video-assistant
```

The API will be available at:

```text
http://localhost:7860
```

## 🛠️ Troubleshooting

### FFmpeg not found

Install FFmpeg and make sure it is available on your `PATH`.

### Whisper model download is slow

The first English transcription may take longer because Whisper downloads the selected model.

### Hinglish transcription fails

Check that `SARVAM_API_KEY` is set in `.env`.

### Mistral calls fail

Check that `MISTRAL_API_KEY` is set and valid.

### Frontend cannot reach backend

Make sure the backend is running on port `8000` and the frontend is running on port `5173`.

## 📝 Generated Runtime Folders

These folders are created/used while the app runs:

- `downloads/` stores uploaded files, downloaded YouTube audio, converted WAV files, and chunks
- `generated/` stores PDF and DOCX exports
- `vector_db/` stores ChromaDB transcript indexes

## 🙌 Credits

Built with FastAPI, React, Whisper, LangChain, Mistral AI, ChromaDB, Sarvam AI, and a lot of audio wrangling.
