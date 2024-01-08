import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as classes from "../../assets/mocks/classes.json";
import * as levels from "../../assets/mocks/levels.json";
import * as races from "../../assets/mocks/races.json";
import { CharacterClass, CharacterLevel, CharacterRace } from ".";

@Injectable({
	providedIn: "root",
})
export class BackendService {
	public readonly dictionaries = {
		/** Расы */
		getRaces$: (): Observable<CharacterRace[]> => {
			return this.request$(races);
		},

		/** Классы */
		getClasses$: (): Observable<CharacterClass[]> => {
			return this.request$(classes);
		},

		/** Уровни */
		getLevel$: (): Observable<CharacterLevel[]> => {
			return this.request$(levels);
		},
	};

	constructor(private readonly httpService: HttpClient) {}

	public request$<T>(body: T): Observable<T> {
		const response = JSON.parse(JSON.stringify(body));
		const obs = new Observable<T>((subscriber) => {
			setTimeout(() => {
				subscriber.next(response.default);
				subscriber.complete();
			}, 1000);
		});
		return obs;
	}
}
