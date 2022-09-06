export type ClubLeagueDate = {
    month: number;
    day: number;
    year: number;
};

export type ClubLeaguePlayer = {
    name: string;
    note: string;
    trophies: number;
    tickets: number;
};

export type ClubLeagueSeason = {
    date: ClubLeagueDate;
    players: ClubLeaguePlayer[];
};

export type ClubLeague = {
    last_season: ClubLeagueDate | null;
    seasons: ClubLeagueSeason[];
};
