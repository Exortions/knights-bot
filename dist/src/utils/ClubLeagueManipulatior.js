"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class ClubLeagueManipulator {
    constructor() {
        this.createFile();
    }
    createFile() {
        if (!fs.existsSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE))
            fs.writeFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE, JSON.stringify({ last_season: null, seasons: [] }));
    }
    getLastSeason() {
        const clubLeague = this.getClubLeague();
        return clubLeague.last_season;
    }
    getClubLeague() {
        return JSON.parse(fs.readFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE).toString());
    }
    addSeason(date, players) {
        const clubLeague = this.getClubLeague();
        clubLeague.seasons.push({ date, players });
        if (clubLeague.last_season === null)
            clubLeague.last_season = date;
        fs.writeFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE, JSON.stringify(clubLeague));
    }
    removeSeason(date) {
        const clubLeague = this.getClubLeague();
        clubLeague.seasons.forEach(season => {
            if (season.date.day === date.day && season.date.month === date.month && season.date.year === date.year) {
                const index = clubLeague.seasons.indexOf(season);
                clubLeague.seasons[index] = { date: date, players: [] };
                fs.writeFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE, JSON.stringify(clubLeague));
            }
        });
    }
    getSeasons() {
        const clubLeague = this.getClubLeague();
        return clubLeague.seasons;
    }
    addPlayer(player) {
        const clubLeague = this.getClubLeague();
        clubLeague.seasons.forEach(season => {
            const last = this.getLastSeason();
            if (last === null)
                return;
            if (season.date.day === last.day && season.date.month === last.month && season.date.year === last.year) {
                season.players.push(player);
                fs.writeFileSync(ClubLeagueManipulator.CLUB_LEAGUE_FILE, JSON.stringify(clubLeague));
            }
        });
    }
    getPlayer(player) {
        const clubLeague = this.getClubLeague();
        let foundPlayer = null;
        clubLeague.seasons.forEach(season => {
            const last = this.getLastSeason();
            if (last === null)
                return;
            if (season.date.day === last.day && season.date.month === last.month && season.date.year === last.year) {
                const found = season.players.find(p => p.name === player);
                if (found)
                    foundPlayer = found;
            }
        });
        return foundPlayer;
    }
}
exports.default = ClubLeagueManipulator;
ClubLeagueManipulator.CLUB_LEAGUE_FILE = 'data/club_league.json';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2x1YkxlYWd1ZU1hbmlwdWxhdGlvci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvQ2x1YkxlYWd1ZU1hbmlwdWxhdGlvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF5QjtBQUl6QixNQUFxQixxQkFBcUI7SUFHdEM7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN0RCxFQUFFLENBQUMsYUFBYSxDQUNaLHFCQUFxQixDQUFDLGdCQUFnQixFQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDckQsQ0FBQztJQUNWLENBQUM7SUFFTSxhQUFhO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV4QyxPQUFPLFVBQVUsQ0FBQyxXQUFXLENBQUM7SUFDbEMsQ0FBQztJQUVNLGFBQWE7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFTSxTQUFTLENBQUMsSUFBb0IsRUFBRSxPQUEyQjtRQUM5RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFeEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUUzQyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEtBQUssSUFBSTtZQUFFLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRW5FLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJB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