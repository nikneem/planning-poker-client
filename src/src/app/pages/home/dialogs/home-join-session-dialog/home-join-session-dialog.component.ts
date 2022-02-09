import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-join-session-dialog',
  templateUrl: './home-join-session-dialog.component.html',
  styleUrls: ['./home-join-session-dialog.component.scss'],
})
export class HomeJoinSessionDialogComponent implements OnInit {
  public joinSessionForm: FormGroup;
  constructor() {
    this.joinSessionForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name: new FormControl(localStorage.getItem('name')),
    });
  }
  ngOnInit(): void {}
}
