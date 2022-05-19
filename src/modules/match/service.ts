import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { MatchEntity } from '@prisma/client'

import {
  MatchCreateInput,
  MatchUpdateInput,
  MatchDeleteInput,
  MatchUpdateScoreInput,
  PlayerUpdateInput,
} from '../../graphql/schema'
import { PrismaService, PlayerService } from '../../services'

@Injectable()
export class MatchService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService,
    @Inject(forwardRef(() => PlayerService)) private readonly playerService: PlayerService
  ) {}

  async create(createInput: MatchCreateInput): Promise<MatchEntity> {
    const match = await this.ps.matchEntity.create({
      data: {
        ...createInput,
      },
    })

    return this.ps.matchEntity.findUnique({ where: { id: match.id }, include: { player1: true, player2: true } })
  }

  async update(updateInput: MatchUpdateInput): Promise<MatchEntity> {
    const { uuid, ...updateInputRest } = updateInput

    const match = await this.ps.matchEntity.findUnique({ where: { uuid }, rejectOnNotFound: true })

    await this.ps.matchEntity.update({
      where: { id: match.id },
      data: {
        ...updateInputRest,
      },
    })

    return this.ps.matchEntity.findUnique({ where: { id: match.id }, include: { player1: true, player2: true } })
  }

  async delete(deleteInput: MatchDeleteInput): Promise<boolean> {
    const { uuid } = deleteInput

    await this.ps.matchEntity.delete({ where: { uuid } })

    return true
  }

  async draw(): Promise<boolean> {
    const players = await this.playerService.findAll()
    const shufledPlayers = players.sort((a, b) => 0.5 - Math.random())
    const resultedPlayers = shufledPlayers.length % 2 === 1 ? [...shufledPlayers, null] : [...shufledPlayers]
    const n = resultedPlayers.length
    const matchCreateInputs: MatchCreateInput[] = []

    for (let i = 0; i < resultedPlayers.length - 1; i++) {
      for (let j = 0; j < resultedPlayers.length / 2; j++) {
        const index1 = (i + j) % (n - 1)
        const index2 = j === 0 ? n - 1 : (i + n - j - 1) % (n - 1)
        const player1 = resultedPlayers[index1]
        const player2 = resultedPlayers[index2]

        if (player1 && player2) {
          matchCreateInputs.push({
            round: i + 1,
            player1Uuid: i % 2 === 0 ? player1.uuid : player2.uuid,
            player2Uuid: i % 2 === 0 ? player2.uuid : player1.uuid,
          })
        }
      }
    }

    for (let i = 0; i < resultedPlayers.length - 1; i++) {
      for (let j = 0; j < resultedPlayers.length / 2; j++) {
        const index1 = (i + j) % (n - 1)
        const index2 = j === 0 ? n - 1 : (i + n - j - 1) % (n - 1)
        const player1 = resultedPlayers[index1]
        const player2 = resultedPlayers[index2]

        if (player1 && player2) {
          matchCreateInputs.push({
            round: i + n,
            player1Uuid: i % 2 === 1 ? player1.uuid : player2.uuid,
            player2Uuid: i % 2 === 1 ? player2.uuid : player1.uuid,
          })
        }
      }
    }

    await Promise.all(matchCreateInputs.map((createInput) => this.create(createInput)))

    return true
  }

  async updateScore(input: MatchUpdateScoreInput) {
    const { uuid, score1, score2 } = input
    const match = await this.ps.matchEntity.findUnique({ where: { uuid }, include: { player1: true, player2: true } })
    const { player1, player2, score1: oldScore1, score2: oldScore2 } = match

    const hadPlayer1Won = oldScore1 !== null && oldScore2 !== null && oldScore1 > oldScore2 ? 1 : 0
    const hadPlayer1Lost = oldScore1 !== null && oldScore2 !== null && oldScore1 < oldScore2 ? 1 : 0
    const hadPlayer1Drawed = oldScore1 !== null && oldScore2 !== null  && oldScore1 === oldScore2 ? 1 : 0

    const hasPlayer1Won = score1 > score2 ? 1 : 0
    const hasPlayer1Lost = score1 < score2 ? 1 : 0
    const hasPlayer1Drawed = score1 === score2 ? 1 : 0

    const playerInput1: PlayerUpdateInput = {
      uuid: player1.uuid,
      played: oldScore1 !== null && oldScore2 !== null ? player1.played : player1.played + 1,
      points: player1.points - hadPlayer1Won * 3 - hadPlayer1Drawed + hasPlayer1Won * 3 + hasPlayer1Drawed,
      won: player1.won -  hadPlayer1Won + hasPlayer1Won,
      lost: player1.lost -  hadPlayer1Lost + hasPlayer1Lost,
      drawed: player1.drawed - hadPlayer1Drawed + hasPlayer1Drawed,
      for: oldScore1 !== null && oldScore2 !== null ? player1.for - oldScore1 + score1 : player1.for + score1,
      against: oldScore1 !== null && oldScore2 !== null ? player1.against - oldScore2 + score2 : player1.against + score2,
    }

    const playerInput2: PlayerUpdateInput = {
      uuid: player2.uuid,
      played: oldScore1 !== null && oldScore2 !== null ? player2.played : player2.played + 1,
      points: player2.points - hadPlayer1Lost * 3 - hadPlayer1Drawed + hasPlayer1Lost * 3 + hasPlayer1Drawed,
      won: player2.won -  hadPlayer1Lost + hasPlayer1Lost,
      lost: player2.lost -  hadPlayer1Won + hasPlayer1Won,
      drawed: player2.drawed - hadPlayer1Drawed + hasPlayer1Drawed,
      for: oldScore1 !== null && oldScore2 !== null ? player2.for - oldScore2 + score2 : player2.for + score2,
      against: oldScore1 !== null && oldScore2 !== null ? player2.against - oldScore1 + score1 : player2.against + score1,
    }

    await this.playerService.update(playerInput1)
    await this.playerService.update(playerInput2)

    await this.ps.matchEntity.update({ where: { uuid }, data: { score1, score2 } })

    return this.ps.matchEntity.findUnique({ where: { uuid }, include: { player1: true, player2: true } })
  }
}
