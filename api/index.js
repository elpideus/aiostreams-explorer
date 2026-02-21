import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Read configuration from environment variables
const AIO_BASE = process.env.AIO_BASE;
const AUTH_HEADER = process.env.AUTH_HEADER;
const PORT = process.env.API_PORT || 3000;

if (!AIO_BASE || !AUTH_HEADER) {
    console.error('❌ Missing required environment variables: AIO_BASE and AUTH_HEADER must be set.');
    process.exit(1);
}

app.get('/api/search', async (req, res) => {
    const { id, type } = req.query;
    if (!id) return res.status(400).json({ error: "Missing id parameter" });

    console.log(`\n🔍 Incoming request: type=${type || 'movie'}, id=${id}`);
    const url = `${AIO_BASE}/search`;
    const params = { type: type || 'movie', id };
    const headers = { Authorization: AUTH_HEADER };

    try {
        const response = await axios.get(url, { params, headers });
        res.json(response.data);
    } catch (error) {
        console.error("❌ AIOStreams Error:", error.message);
        res.status(500).json({ error: "Failed to fetch from AIOStreams" });
    }
});

// Serve static frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Fallback: for any other request, serve the SPA's index.html (client-side routing)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));