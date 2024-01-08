import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as races from "../../assets/mocks/races.json";
import { Race } from ".";

@Injectable({
	providedIn: "root",
})
export class BackendService {
	public readonly character = {
		getRaces$: (): Observable<Race[]> => {
			const response = JSON.parse(JSON.stringify(races));
			const obs = new Observable<Race[]>((subscriber) => {
				setTimeout(() => {
					subscriber.next(response.default);
					subscriber.complete();
				}, 1000);
			});
			return obs;
		},
	};

	constructor(private readonly httpService: HttpClient) {}
}
