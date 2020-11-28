import { NgModule } from '@angular/core';
// added imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

const MaterialComponents = [MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatSelectModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatDialogModule,
  MatPaginatorModule
];
@NgModule({
  imports: [MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  exports: [MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class MatComponentsModule { }