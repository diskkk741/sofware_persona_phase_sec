import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WordEntry } from '../../interfaces/word-entry';

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.css']
})
export class WordItemComponent {
  @Input() entry!: WordEntry;
  @Output() edit = new EventEmitter<WordEntry>();
  @Output() remove = new EventEmitter<WordEntry>();
}
