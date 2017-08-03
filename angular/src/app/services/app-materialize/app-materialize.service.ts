import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class AppMaterializeService {

  constructor() { }

  InitSideNav()
  {
    $(".button-collapse").sideNav();
  }

  InitDatePicker()
  {
    //pickadatejs http://amsul.ca/pickadate.js/api/
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true, // Close upon selecting a date,
    });

    $('.datepicker').css('cursor', 'pointer');

    return $('.datepicker').pickadate('picker');
  }
}
