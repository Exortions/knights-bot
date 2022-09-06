import * as fs from 'fs';

import { ClubLeague, ClubLeagueDate, ClubLeaguePlayer, ClubLeagueSeason } from '../types/index';

export default class ClubLeagueManipulator {
    public static CLUB_LEAGUE_FILE = 'data/club_league.json';

    constructor() {
        this.createFile();
    }

    private createFile(): void {
        if (!fs.existsSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE))
            fs.writeFileSync(
                ClubLeagueManipulator.CLUB_LEAGUE_FILE,
                JSON.stringify({ last_season: null, seasons: [] }),
            );
    }

    public getLastSeason(): ClubLeagueDate | null {
        const clubLeague = this.getClubLeague();

        return clubLeague.last_season;
    }

    public getClubLeague(): ClubLeague {
        return JSON.parse(fs.readFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE).toString());
    }

    public addSeason(date: ClubLeagueDate, players: ClubLeaguePlayer[]): void {
        const clubLeague = this.getClubLeague();

        clubLeague.seasons.push({ date, players });

        if (clubLeague.last_season === null) clubLeague.last_season = date;

        fs.writeFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE, JSON.stringify(clubLeague));
    }

    public removeSeason(date: ClubLeagueDate): void {
        const clubLeague = this.getClubLeague();

        clubLeague.seasons.forEach(season => {
            if (season.date.day === date.day && season.date.month === date.month && season.date.year === date.year) {
                const index = clubLeague.seasons.indexOf(season);

                clubLeague.seasons[index] = { date: date, players: [] };

                fs.writeFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE, JSON.stringify(clubLeague));
            }
        });
    }

    public getSeasons(): ClubLeagueSeason[] {
        const clubLeague = this.getClubLeague();

        return clubLeague.seasons;
    }

    public addPlayer(player: ClubLeaguePlayer): void {
        const clubLeague = this.getClubLeague();

        clubLeague.seasons.forEach(season => {
            const last = this.getLastSeason();

            if (last === null) return;

            if (season.date.day === last.day && season.date.month === last.month && season.date.year === last.year) {
                season.players.push(player);

                fs.writeFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE, JSON.stringify(clubLeague));
            }
        });
    }

    public getPlayer(player: string): ClubLeaguePlayer | null {
        const clubLeague = this.getClubLeague();

        let foundPlayer: ClubLeaguePlayer | null = null;

        clubLeague.seasons.forEach(season => {
            const last = this.getLastSeason();

            if (last === null) return;

            if (season.date.day === last.day && season.date.month === last.month && season.date.year === last.year) {
                const found = season.players.find(p => p.name === player);

                if (found) foundPlayer = found;
            }
        });

        return foundPlayer;
    }
}
