import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { MatchEntity } from '@prisma/client'

import {
  MatchCreateInput,
  MatchUpdateInput,
  MatchDeleteInput,
} from '../../graphql/schema'
import { PrismaService, PlayerService } from '../../services'

@Injectable()
export class MatchService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService,
    @Inject(forwardRef(() => PlayerService)) private readonly playerService: PlayerService
  ) {}

  async create(createInput: MatchCreateInput): Promise<MatchEntity> {
    const Match = await this.ps.matchEntity.create({
      data: {
        ...createInput,
      },
    })

    return this.ps.matchEntity.findUnique({ where: { id: Match.id }, include: { player1: true, player2: true } })
  }

  async update(updateInput: MatchUpdateInput): Promise<MatchEntity> {
    const { uuid, ...updateInputRest } = updateInput

    const Match = await this.ps.matchEntity.findUnique({ where: { uuid }, rejectOnNotFound: true })

    await this.ps.matchEntity.update({
      where: { id: Match.id },
      data: {
        ...updateInputRest,
      },
    })

    return this.ps.matchEntity.findUnique({ where: { id: Match.id }, include: { player1: true, player2: true } })
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

    for (let i = 0; i < resultedPlayers.length - 1; i++) {
      for (let j = 0; j < resultedPlayers.length / 2; j++) {
        const index1 = (i + j) % (n - 1)
        const index2 = j === 0 ? n - 1 : (i + n - j - 1) % (n - 1)
        const player1 = resultedPlayers[index1]
        const player2 = resultedPlayers[index2]

        if (player1 && player2) {
          await this.create({
            round: i,
            player1Uuid: i % 2 === 0 ? player1.uuid : player2.uuid,
            player2Uuid: i % 2 === 0 ? player2.uuid : player1.uuid,
          })
        }
      }
    }

    return true
  }
}
