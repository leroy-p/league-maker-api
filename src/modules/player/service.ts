import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { MatchEntity, PlayerEntity } from '@prisma/client'

import { MatchResult, Player, Match, PlayerFindOneInput } from '../../graphql/schema'
import { PrismaService } from '../../services'

@Injectable()
export class PlayerService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService
  ) {}

  async findOne(input: PlayerFindOneInput): Promise<Player> {
    const player = await this.ps.playerEntity.findFirst({
      ...input,
      include: {
        matches1: { 
          include: {
            player1: { include: { matches1: true, matches2: true } },
            player2: { include: { matches1: true, matches2: true } } ,
          },
        },
        matches2: { 
          include: {
            player1: { include: { matches1: true, matches2: true } },
            player2: { include: { matches1: true, matches2: true } } ,
          },
        },
      }
    })
    const players = await this.ps.playerEntity.findMany({ 
      orderBy: { points: 'desc' },
      include: { matches1: true, matches2: true }
    })
    const sortedPlayers = players.sort((a, b) => this.sortPlayers(a, b))
    const matches = player.matches1.concat(player.matches2).sort((a, b) => a.round - b.round)    

    return {
      ...player,
      diff: player.for - player.against,
      rank: this.getRank(player, sortedPlayers),
      streak: this.getStreak(player),
      matches: matches.map((match) => ({
        ...match,
        player1: {
          ...match.player1,
          rank: this.getRank(match.player1, sortedPlayers)
        },
        player2: {
          ...match.player2,
          rank: this.getRank(match.player2, sortedPlayers)
        },
      })),
    }
  }

  async getLeaderboard(): Promise<Player[]> {
    const players = await this.ps.playerEntity.findMany({ 
      orderBy: { points: 'desc' },
      include: { matches1: true, matches2: true }
    })
    const sortedPlayers = players.sort((a, b) => this.sortPlayers(a, b))

    return sortedPlayers.map((player) => ({
        ...player,
        diff: player.for - player.against,
        rank: this.getRank(player, sortedPlayers),
        streak: this.getStreak(player),
        matches: [],
    }))
  }

  private getStreak(player: PlayerEntity & { matches1?: MatchEntity[]; matches2?: MatchEntity[] }): MatchResult[] {
    const { matches1, matches2 } = player

    function matchToResult(
      match: Match,
      isPlayer1: boolean
    ): { result: MatchResult, round: number } {
      if (match.score1 < match.score2) return { result: isPlayer1 ? MatchResult.LOST : MatchResult.WON, round: match.round }
      if (match.score1 > match.score2) return { result: isPlayer1 ? MatchResult.WON : MatchResult.LOST, round: match.round }

      return { result: MatchResult.DRAWED, round: match.round }
    }

    const result1 = matches1.filter((match) => match.score1 !== null && match.score2 !== null).map((match) => matchToResult(match, true))
    const result2 = matches2.filter((match) => match.score1 !== null && match.score2 !== null).map((match) => matchToResult(match, false))
    const sortedResults = result1.concat(result2).sort((a, b) => b.round - a.round).slice(0, 5)
  
    return sortedResults.map(({ result }) => result).reverse()
  }

  sortPlayers(
    a: PlayerEntity & { matches1: MatchEntity[]; matches2: MatchEntity[] },
    b: PlayerEntity & { matches1: MatchEntity[]; matches2: MatchEntity[] }
  ): number {
    if (a.points !== b.points) return b.points - a.points
    if ((a.for - a.against) - (b.for - b.against) > 0) return -1
    if ((a.for - a.against) - (b.for - b.against) < 0) return 1

    return b.for - a.for
  }

  getRank(
    player: PlayerEntity & { matches1?: MatchEntity[]; matches2?: MatchEntity[] },
    sortedPlayers: Array<PlayerEntity & { matches1: MatchEntity[]; matches2: MatchEntity[] }>
  ): number {
    let rank = 1

    for (let i = 0; i < sortedPlayers.length; i++) {
      if (sortedPlayers[i].uuid === player.uuid) return rank

      if (i === sortedPlayers.length - 1 ||
        sortedPlayers[i].points !==  sortedPlayers[i + 1].points ||
        sortedPlayers[i].for - sortedPlayers[i].against !== sortedPlayers[i + 1].for - sortedPlayers[i + 1].against ||
        sortedPlayers[i].for !==  sortedPlayers[i + 1].for
      ) {
        rank +=1
      }
    }

    return 0
  }
}
