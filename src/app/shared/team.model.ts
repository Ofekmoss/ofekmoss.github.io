export class Team {
    // public name: string, 
    // public league: string, 
    // public rank: number, 
    // public image_path: string, 
    // public type: string,
    constructor(
        public id: number,
        public name: string,
        public country: string,
        public league: string,
        public rating: number,
        public emblem_path: string,    
    ) {}
}