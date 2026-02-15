import { Injectable } from '@angular/core';
import { WordEntry } from '../interfaces/word-entry';

const STORAGE_KEY = 'birkelime_words_v1';

@Injectable({ providedIn: 'root' })
export class WordService {
  private read(): WordEntry[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as WordEntry[];
    } catch {
      return [];
    }
  }

  private write(list: WordEntry[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  list(): WordEntry[] {
    return this.read().sort((a, b) => b.wordDate.localeCompare(a.wordDate));
  }

  upsert(entry: WordEntry): { ok: boolean; reason?: 'DATE_EXISTS' } {
    const list = this.read();

    // Aynı güne 2 kayıt yok
    const sameDate = list.find(x => x.wordDate === entry.wordDate && x.id !== entry.id);
    if (sameDate) return { ok: false, reason: 'DATE_EXISTS' };

    const idx = list.findIndex(x => x.id === entry.id);
    if (idx >= 0) list[idx] = entry;
    else list.push(entry);

    this.write(list);
    return { ok: true };
  }

  remove(id: string) {
    this.write(this.read().filter(x => x.id !== id));
  }

  reset() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
