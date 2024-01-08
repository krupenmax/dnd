import { NgFor } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { forkJoin } from "rxjs";
import { CharacterClass, CharacterLevel, CharacterRace } from "../../core";
import { BackendService } from "../../core/backend.service";

@Component({
	selector: "app-character-default-create",
	standalone: true,
	imports: [MatSelectModule, MatButtonModule, MatFormFieldModule, MatCardModule, ReactiveFormsModule, NgFor],
	templateUrl: "./character-default-create.component.html",
	styleUrl: "./character-default-create.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDefaultCreateComponent {
	public races: CharacterRace[] = [];
	public classes: CharacterClass[] = [];
	public levels: CharacterLevel[] = [];

	public form = this.fb.group({
		general: this.fb.group({
			race: this.fb.control<number | null>(null, [Validators.required]),
			class: this.fb.control<number | null>(null, [Validators.required]),
			level: this.fb.control<number | null>(null, [Validators.required]),
			trait: this.fb.control<number | null>(null, [Validators.required]),
		}),
	});

	private readonly destroy = inject(DestroyRef);

	constructor(
		private readonly backendService: BackendService,
		private readonly cdr: ChangeDetectorRef,
		private readonly fb: FormBuilder
	) {
		this.getDictionaries();
	}

	public getDictionaries(): void {
		forkJoin({
			races: this.backendService.dictionaries.getRaces$(),
			classes: this.backendService.dictionaries.getClasses$(),
			levels: this.backendService.dictionaries.getLevel$(),
		})
			.pipe(takeUntilDestroyed(this.destroy))
			.subscribe((data) => {
				this.races = data.races;
				this.classes = data.classes;
				this.levels = data.levels;
				this.cdr.detectChanges();
			});
	}
}
