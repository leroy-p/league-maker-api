import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { PlayerEntity } from '@prisma/client'
import * as moment from 'moment'

import {
  PlayerCreateInput,
  PlayerUpdateInput,
  PlayerDeleteInput,
  PlayerForLeaderboard, GameResult, Player, Match
} from '../../graphql/schema'
import { PrismaService } from '../../services'

@Injectable()
export class PlayerService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService
  ) {}

  async findAll(): Promise<PlayerEntity[]> {
    return this.ps.playerEntity.findMany({ include: { matches1: true, matches2: true } })
  }

  async getLeaderboard(): Promise<PlayerForLeaderboard[]> {
    const players = await this.ps.playerEntity.findMany({ 
      orderBy: { points: 'desc' },
      include: { matches1: true, matches2: true }
    })

    const sortedPlayers = players.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points
      if ((a.for - a.against) - (b.for - b.against) > 0) return -1
      if ((a.for - a.against) - (b.for - b.against) < 0) return 1

      return b.for - a.for
    })

    return sortedPlayers.map((player) => {
      const matches = player.matches1.concat(player.matches2)

      return {
        ...player,
        diff: player.for - player.against,
        streak: this.getStreak(player),
    }})
  }

  async create(createInput: PlayerCreateInput): Promise<PlayerEntity> {
    const player = await this.ps.playerEntity.create({
      data: {
        ...createInput,
      },
    })

    return this.ps.playerEntity.findUnique({ where: { id: player.id }, include: { matches1: true, matches2: true } })
  }

  async update(updateInput: PlayerUpdateInput): Promise<PlayerEntity> {
    const { uuid, ...updateInputRest } = updateInput

    const player = await this.ps.playerEntity.findUnique({ where: { uuid }, rejectOnNotFound: true })

    await this.ps.playerEntity.update({
      where: { id: player.id },
      data: {
        ...updateInputRest,
      },
    })

    return this.ps.playerEntity.findUnique({ where: { id: player.id }, include: { matches1: true, matches2: true } })
  }

  async delete(deleteInput: PlayerDeleteInput): Promise<boolean> {
    const { uuid } = deleteInput

    await this.ps.playerEntity.delete({ where: { uuid } })

    return true
  }

  private getStreak(player: Player): GameResult[] {
    const { matches1, matches2 } = player

    function matchToResult(
      match: Match,
      isPlayer1: boolean
    ): { result: GameResult, date: string } {
      if (match.score1 < match.score2) return { result: isPlayer1 ? GameResult.LOST : GameResult.WON, date: match.updatedAt }
      if (match.score1 > match.score2) return { result: isPlayer1 ? GameResult.WON : GameResult.LOST, date: match.updatedAt }

      return { result: GameResult.DRAWED, date: match.updatedAt }
    }

    const result1: { result: GameResult, date: string }[] = 
      matches1.filter((match) => match.score1 !== null && match.score2 !== null).map((match) => matchToResult(match, true))
    const result2: { result: GameResult, date: string }[] =
      matches2.filter((match) => match.score1 !== null && match.score2 !== null).map((match) => matchToResult(match, false))

    return result1.concat(result2).sort((a, b) => {
      if (moment(a.date).isAfter(b.date)) return -1
      if (moment(a.date).isBefore(b.date)) return 1

      return 0
    }).map(({ result }) => result).slice(0, 5)
  }
}
