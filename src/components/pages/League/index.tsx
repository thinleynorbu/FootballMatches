import React, { useEffect, useState } from 'react';
import { API } from '../../../api';
import LeagueTable from '../../molecules/LeagueTable';

export interface LeagueData {
    match: number
    wins: number
    loss: number
    draw: number
    name: string
    id: number
}

const League = () => {

    const [leagueData, setLeagueData] = useState([] as LeagueData[])

    const fetchData = async () => {
        const matchResponse = await API.get('match');
        const teamResponse = await API.get('teams');
        const matches = matchResponse.data;
        const teams = teamResponse.data;
        console.log(matches, "amat", teams)
        const league = teams;
        league.forEach((item: any) => {
            item.match = 0;
            item.wins = 0;
            item.loss = 0;
            item.points = 0;
            item.draw = 0;
        })
        matches.forEach((match: any) => {
            teams.forEach((team: any, index: number) => {
                if (team.name === match.awayTeam) {
                    league[index].match++;
                    if (match.awayScore === match.homeScore) {
                        league[index].draw++;
                        league[index].points++;
                        return;
                    }
                    if (match.awayScore > match.homeScore) {
                        league[index].wins++;
                        league[index].points = league[index].points + 3
                    } else {
                        league[index].loss++;

                    }
                } else if (team.name === match.homeTeam) {
                    league[index].match++;
                    if (match.awayScore === match.homeScore) {
                        league[index].draw++;
                        league[index].points++;
                        return;
                    }
                    if (match.awayScore < match.homeScore) {
                        league[index].wins++;
                        league[index].points = league[index].points + 3
                    } else {
                        league[index].loss++;
                    }

                }
            })
        })
        setLeagueData(league)
        console.log(league, "add mac")
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <LeagueTable leagueData={leagueData} />
    )
}

export default League;