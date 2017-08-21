import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-alert-tag-popup',
  templateUrl: './alert-tag-popup.component.html',
  styleUrls: ['./alert-tag-popup.component.css']
})
export class AlertTagPopupComponent implements OnInit {

  constructor(
    private dialog: MdDialog,
    @Inject(MD_DIALOG_DATA) private data: any
  ) { }

  tags: [any];
  ngOnInit() {
    this.tags = this.data;
  }
}
