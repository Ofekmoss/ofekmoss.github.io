export class GameStats {
    public id: number;
    public time: string;
    public homeTeam = {
        "playerIds": [],
        'teamId': null,
        'score': null,
        'multiplayer': null
    }
    public awayTeam = {
        "playerIds": [],
        'teamId': null,
        'score': null,
        'multiplayer': null
    }
    constructor(
        homePlayerIds: number[],
        homeTeamId: number,
        homeScore: number,
        homeMultiplayer: boolean,
        awayPlayerIds: number[],
        awayTeamId: number,
        awayScore: number,
        awayMultiplayer: boolean
    ) {
        this.id = Math.floor(Math.random() * 1000000);
        this.homeTeam.playerIds = homePlayerIds;
        this.homeTeam.teamId = homeTeamId;
        this.homeTeam.score = homeScore;
        this.homeTeam.multiplayer = homeMultiplayer;
        this.awayTeam.playerIds = awayPlayerIds;
        this.awayTeam.teamId = awayTeamId;
        this.awayTeam.score = awayScore;
        this.awayTeam.multiplayer = awayMultiplayer;
        this.time = new Date().toUTCString()
    }
}
