import { Component, OnDestroy } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  isCheck: boolean;
  type: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: "Hydrogen",
    weight: 1.0079,
    symbol: "H",
    isCheck: true,
    type: "Regular"
  },
  {
    position: 2,
    name: "Helium",
    weight: 4.0026,
    symbol: "He",
    isCheck: false,
    type: "Regular"
  },
  {
    position: 3,
    name: "Lithium",
    weight: 6.941,
    symbol: "Li",
    isCheck: false,
    type: "Not Regular"
  },
  {
    position: 4,
    name: "Beryllium",
    weight: 9.0122,
    symbol: "Be",
    isCheck: false,
    type: "Regular"
  },
  {
    position: 5,
    name: "Boron",
    weight: 10.811,
    symbol: "B",
    isCheck: false,
    type: "Regular"
  },
  {
    position: 6,
    name: "Carbon",
    weight: 12.0107,
    symbol: "C",
    isCheck: false,
    type: "Not Regular"
  },
  {
    position: 7,
    name: "Nitrogen",
    weight: 14.0067,
    symbol: "N",
    isCheck: false,
    type: "Regular"
  },
  {
    position: 8,
    name: "Oxygen",
    weight: 15.9994,
    symbol: "O",
    isCheck: false,
    type: "Not Regular"
  },
  {
    position: 9,
    name: "Fluorine",
    weight: 18.9984,
    symbol: "F",
    isCheck: false,
    type: "Not Regular"
  },
  {
    position: 10,
    name: "Neon",
    weight: 20.1797,
    symbol: "Ne",
    isCheck: true,
    type: "Not Regular"
  }
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: "table-basic-example",
  styleUrls: ["table-basic-example.css"],
  templateUrl: "table-basic-example.html"
})
export class TableBasicExample {
  public useForm: FormGroup;
  indexToPush = [];
  types = ["Regular", "Not Regular"];
  updatedElements: PeriodicElement[] = [];
  public displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "isCheck",
    "type"
  ];
  // public dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource(
    ELEMENT_DATA
  );

  constructor() {
    this.initForm();
  }

  public initForm() {
    /* FormGroup for all editable cells in a row */
    const rowFormGroups = ELEMENT_DATA.map(element => {
      const rowFormGroup = new FormGroup({
        position: new FormControl(element.position),
        symbol: new FormControl(element.symbol),
        isCheck: new FormControl(element.isCheck),
        type: new FormControl(element.type)
      });

      /* Listen for changes to the row */
      rowFormGroup.valueChanges.subscribe(rowValues => {
        console.log("Changing", this.useForm.get("elements"));
      });
      return rowFormGroup;
    });

    /* Parent FormGroup */
    this.useForm = new FormGroup({
      /* FormArray to contain all the row FormGroups */
      elements: new FormArray(rowFormGroups)
    });
  }

  public saveChanges() {
    // console.log(this.useForm);
    const len = (this.useForm.get("elements") as FormArray).length;
    // the line below is the actual info we need
    // *******************************************
    //console.log("next", this.useForm.get("elements").controls[i].value);
    // console.log('play here', ( (this.useForm.get('elements') as FormArray) ));
    for (let i = 0; i < len; i++) {
      if ((this.useForm.get("elements") as FormArray).at(i).dirty) {
        this.indexToPush.push(i);
      }
    }

    // I should not be pushing this.dataSource but I don't know how to access the updated row.
    for ( let i = 0, j = 0; i < this.dataSource.data.length && j < this.indexToPush.length; i++ ) {
      if (this.indexToPush[j] === i) {
        // console.log(this.dataSource.data[i]);
        //              this.dataSource.data[i].symbol =
        // this.updatedElements.push(this.dataSource.data[i]);
        this.updatedElements.push(this.useForm.get("elements").controls[i].value);
    

        j++;
      }
    }

     console.log('Check if my updated data is being saved.', this.updatedElements);
  }
}
