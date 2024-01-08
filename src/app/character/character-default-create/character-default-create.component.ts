import { NgFor } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { BackendService } from "../../core/backend.service";

@Component({
	selector: "app-character-default-create",
	standalone: true,
	imports: [MatSelectModule, MatButtonModule, MatFormFieldModule, NgFor],
	templateUrl: "./character-default-create.component.html",
	styleUrl: "./character-default-create.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDefaultCreateComponent {
	public races: string[] = ["Раса1", "Раса2"];

	private readonly destroy = inject(DestroyRef);

	constructor(private readonly backendService: BackendService) {
		this.backendService.character
			.getRaces$()
			.pipe(takeUntilDestroyed(this.destroy))
			.subscribe(console.log);
	}
}
