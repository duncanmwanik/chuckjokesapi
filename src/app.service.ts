import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Joke } from './app.types';

const FILE_PATH = join(process.cwd(), 'jokes.json');

@Injectable()
export class JokesService {
  private async read(): Promise<Joke[]> {
    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private async write(jokes: Joke[]) {
    await fs.writeFile(FILE_PATH, JSON.stringify(jokes, null, 2));
  }

  async submit(text: string): Promise<Joke> {
    const jokes = await this.read();

    const joke: Joke = {
      id: randomUUID(),
      text,
      rating: 1,
    };

    jokes.push(joke);
    await this.write(jokes);

    return joke;
  }

  async random(): Promise<Joke | null> {
    const jokes = await this.read();
    if (jokes.length === 0) return null;

    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  async rate(id: string, rating: number): Promise<Joke | null> {
    const jokes = await this.read();

    const joke = jokes.find(j => j.id === id);
    if (!joke) return null;

    joke.rating = rating;
    await this.write(jokes);

    return joke;
  }
}