export class Team {
    public id: number;
    constructor(
        public name: string, 
        public league: string, 
        public rank: number, 
        public image_path: string, 
        public type: string,
        id?: number, 
        ) {
            if (id) {
                this.id = id;
            } else {
                this.id = Math.floor(Math.random() * 1000000);
            }
    }
}