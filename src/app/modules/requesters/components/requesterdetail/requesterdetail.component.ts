import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requesterdetail',
  templateUrl: './requesterdetail.component.html',
  styleUrls: ['./requesterdetail.component.scss'],
})
export class RequesterdetailComponent implements OnInit {
  moreitems: any;
  addTagdiv: boolean = true;
  addTagEntrydiv: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.moreitems = [
      {
        label: 'Edit Requester',
      },
      {
        label: 'Merge',
      },
      {
        label: 'Deactivate Requester',
      },
      {
        label: 'Opt out of analtyics',
      },

      {
        label: 'Forget User',
      },
    ];
  }
  addTags() {
    this.addTagdiv = false;
    this.addTagEntrydiv = true;
  }
  cancelAddTag() {
    this.addTagdiv = true;
    this.addTagEntrydiv = false;
  }
}
