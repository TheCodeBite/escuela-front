import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { VersalonComponent } from './componentes/versalon/versalon.component';
const routes: Routes = [
	{
		path: "", component: InicioComponent
	},
	{
		path: "salon", component: VersalonComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
