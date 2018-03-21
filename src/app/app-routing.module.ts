import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PractitionerComponent } from './practitioner/practitioner.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
    { path: 'patient', component: PatientComponent},
    { path: 'practitioner', component: PractitionerComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    { path: '**', redirectTo: '/dashboard'}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}