import { Component, OnInit } from '@angular/core';
import { WordEntry } from '../../interfaces/word-entry';
import { WordService } from '../../services/word.service';

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function uid(): string {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  entries: WordEntry[] = [];

  filterYear: string = 'all';
  filterMonth: string = 'all';
  search: string = '';

  editingId: string | null = null;
  wordDate: string = todayISO();
  word: string = '';
  description: string = '';
  error: string = '';

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.entries = this.wordService.list();
  }

  get filteredEntries(): WordEntry[] {
    const s = this.search.trim().toLowerCase();
    return this.entries.filter(e => {
      const [y, m] = e.wordDate.split('-');
      const okYear = this.filterYear === 'all' || y === this.filterYear;
      const okMonth = this.filterMonth === 'all' || m === this.filterMonth;
      const okSearch = !s || e.word.toLowerCase().includes(s) || e.description.toLowerCase().includes(s);
      return okYear && okMonth && okSearch;
    });
  }

  get years(): string[] {
    const set = new Set(this.entries.map(e => e.wordDate.split('-')[0]));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }

  months() {
    return [
      { value: '01', label: 'Ocak' }, { value: '02', label: 'Şubat' }, { value: '03', label: 'Mart' },
      { value: '04', label: 'Nisan' }, { value: '05', label: 'Mayıs' }, { value: '06', label: 'Haziran' },
      { value: '07', label: 'Temmuz' }, { value: '08', label: 'Ağustos' }, { value: '09', label: 'Eylül' },
      { value: '10', label: 'Ekim' }, { value: '11', label: 'Kasım' }, { value: '12', label: 'Aralık' },
    ];
  }

  stats() {
    const total = this.entries.length;
    const [ty, tm] = todayISO().split('-');
    const thisMonth = this.entries.filter(e => e.wordDate.startsWith(`${ty}-${tm}`)).length;
    const today = this.entries.filter(e => e.wordDate === todayISO()).length;
    return { total, thisMonth, today };
  }

  startCreate() {
    this.editingId = null;
    this.wordDate = todayISO();
    this.word = '';
    this.description = '';
    this.error = '';
  }

  startEdit(entry: WordEntry) {
    this.editingId = entry.id;
    this.wordDate = entry.wordDate;
    this.word = entry.word;
    this.description = entry.description;
    this.error = '';
  }

  save() {
    const w = this.word.trim();
    const d = this.description.trim();
    const date = this.wordDate;

    if (!w || !d || !date) {
      this.error = 'Kelime, açıklama ve tarih zorunlu.';
      return;
    }

    const payload: WordEntry = {
      id: this.editingId ?? uid(),
      word: w,
      description: d,
      wordDate: date,
    };

    const res = this.wordService.upsert(payload);
    if (!res.ok && res.reason === 'DATE_EXISTS') {
      this.error = 'Bu gün için zaten kelime var. Başka bir gün seç.';
      return;
    }

    this.refresh();
    this.startCreate();
  }

  remove(entry: WordEntry) {
    const ok = confirm(`Silinsin mi?\n${entry.word} (${entry.wordDate})`);
    if (!ok) return;
    this.wordService.remove(entry.id);
    this.refresh();
  }

  resetAll() {
    const ok = confirm('Tüm veriler sıfırlansın mı?');
    if (!ok) return;
    this.wordService.reset();
    this.refresh();
    this.startCreate();
  }
}
