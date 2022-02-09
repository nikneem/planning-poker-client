import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-create-session-dialog',
  templateUrl: './home-create-session-dialog.component.html',
  styleUrls: ['./home-create-session-dialog.component.scss'],
})
export class HomeCreateSessionDialogComponent implements OnInit {
  public createSessionForm: FormGroup;
  constructor() {
    this.createSessionForm = new FormGroup({
      name: new FormControl(localStorage.getItem('name'), [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {}
}
