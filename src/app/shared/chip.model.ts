export class Chip {
    public id: number;
    constructor(public userId: number, public friend: boolean, public friendName?: string) {
        this.id = Math.floor(Math.random() * 1000000);
     }
}