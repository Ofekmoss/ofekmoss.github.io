import { Team } from "./team.model";
interface ratingObject {
    "5_stars": Team[]; 
    '4.5_stars': Team[]; 
    '4_stars': Team[];
    '3.5_stars': Team[]; 
}
export class TeamsData {
    public clubs: ratingObject = {} as ratingObject;
    public national: ratingObject = {} as ratingObject;

    constructor(
        clubs_5: Team[],
        clubs_4_5: Team[],
        clubs_4: Team[],
        clubs_3_5: Team[],
        national_5: Team[],
        national_4_5: Team[],
        national_4: Team[],
        national_3_5: Team[],
    ) {
        console.log(this.clubs)
        this.clubs["5_stars"] = clubs_5;
        this.clubs["4.5_stars"] = clubs_4_5;
        this.clubs["4_stars"] = clubs_4;
        this.clubs["3.5_stars"] = clubs_3_5;
        this.national["5_stars"] = national_5;
        this.national["4.5_stars"] = national_4_5;
        this.national["4_stars"] = national_4;
        this.national["3.5_stars"] = national_3_5;
    }
}