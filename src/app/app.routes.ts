import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		loadComponent: () =>
			import("./menu-panel/menu-panel.component").then(
				(i) => i.MenuPanelComponent,
			),
	},
	{
		path: "character",
		loadChildren: () => import("./character/character.routes"),
	},
];
