import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PractitionerComponent } from './practitioner/practitioner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { PractitionerListComponent } from './practitioner-list/practitioner-list.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
    { path: 'patient', component: PatientComponent},
    { path: 'patient-list', component: PatientListComponent},
    { path: 'assignment', component: AssignmentComponent},
    { path: 'practitioner', component: PractitionerComponent},
    { path: 'confirmation', component: ConfirmationComponent},
    { path: 'practitioner-list', component: PractitionerListComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: '', redirectTo: '/patient-list', pathMatch: 'full'},
    { path: '**', redirectTo: '/dashboard'}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}