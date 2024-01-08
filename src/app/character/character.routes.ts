import { Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		children: [
			{
				path: "create",
				loadComponent: () =>
					import("./character-default-create/character-default-create.component").then(
						(i) => i.CharacterDefaultCreateComponent
					),
			},
		],
	},
];

export default routes;
