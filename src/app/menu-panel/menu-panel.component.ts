import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";

@Component({
	selector: "app-menu-panel",
	standalone: true,
	imports: [MatButtonModule, RouterLink],
	templateUrl: "./menu-panel.component.html",
	styleUrl: "./menu-panel.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPanelComponent {
	constructor(private readonly router: Router) {}
}
