import { AppMaterializeService } from '../../services/app-materialize/app-materialize.service';
import { PeopleGroupService } from '../../services/people-group/people-group.service';
import { Component, OnInit } from '@angular/core';
import { ControlCreateGroupFormService } from './control-create-group.form.service';
declare var $: any;

@Component({
  selector: 'app-control-create-group',
  templateUrl: './control-create-group.component.html',
  styleUrls: ['./control-create-group.component.css'],
  providers: [ControlCreateGroupFormService]
})
export class ControlCreateGroupComponent implements OnInit {

  constructor(
    private peopleGroupService: PeopleGroupService,
    private compFormService: ControlCreateGroupFormService,
    private materializeService: AppMaterializeService
  ) { }

  groups: any[];
  ngOnInit() {
    this.materializeService.InitCollapsible();
    this.compFormService.InitForm();
    this.peopleGroupService .GetAllGroups(`
                              name
                              desc  
                            `)
                            .subscribe(res => this.groups = res);
  }

  chosenIndex: number = -1;
  ToggleCollapsible(index: number)
  {
    (this.chosenIndex == index)? this.chosenIndex = -1 : this.chosenIndex = index;
    if(this.chosenIndex != -1)
    {
      $('#collapsible') .removeClass('display-none')
                        .collapsible('close', 0)
                        .collapsible('open', 0);
    }
    else
    {
      $('#collapsible') .collapsible('close', 0)
                        .addClass('display-none');
    }
  }

  SubmitForm()
  {
    let name = this.compFormService.GetValueOfField('name');
    let desc = this.compFormService.GetValueOfField('desc');
    this.peopleGroupService .CreateGroup(name, desc)
                            .subscribe(res => {
                              if(res)
                              {
                                this.groups.push(res);
                                this.compFormService.ClearForm();
                              }
                            });
  }

  RemoveGroup(name: string)
  {
    this.peopleGroupService .RemoveGroup(name)
                            .subscribe(res => {
                              this.ToggleCollapsible(-1);
                              this.groups = res;
                            });
  }
}
