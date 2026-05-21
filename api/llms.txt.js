import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'llms.txt');
        const fileContents = fs.readFileSync(filePath, 'utf8');

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.status(200).send(fileContents);
    } catch (error) {
        res.status(500).send('Failed to load llms.txt');
    }
}