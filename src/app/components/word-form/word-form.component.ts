import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.css']
})
export class WordFormComponent {
  @Input() isEdit = false;

  @Input() wordDate = '';
  @Input() word = '';
  @Input() description = '';
  @Input() error = '';

  @Output() wordDateChange = new EventEmitter<string>();
  @Output() wordChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
}
