import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { ReportGeneratorComponent } from './report-generator.component';


@NgModule({
  declarations: [ReportGeneratorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatComponentsModule
  ]
})
export class ReportModule { }
