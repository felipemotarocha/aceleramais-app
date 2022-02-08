import { _ScoringSystem } from '~store/championship-creation/championship-creation.slice'
import ChampionshipScoringSystemUtils from './scoring-system-selection.utils'

describe('Championship Scoring System Utils', () => {
  const scoringSystem: _ScoringSystem[] = [
    {
      position: 1,
      points: 25
    },
    {
      position: 2,
      points: 20
    },
    {
      position: 3,
      points: 18
    }
  ]

  it('should correctly update after middle position removal', () => {
    expect(
      ChampionshipScoringSystemUtils.updateAfterPositionRemoval({
        scoringSystem,
        position: 2,
        reset: jest.fn(),
        setValue: jest.fn()
      })
    ).toStrictEqual([
      {
        position: 1,
        points: 25
      },

      {
        position: 2,
        points: 18
      }
    ])
  })

  it('should correctly update after first position removal', () => {
    expect(
      ChampionshipScoringSystemUtils.updateAfterPositionRemoval({
        scoringSystem,
        position: 1,
        reset: jest.fn(),
        setValue: jest.fn()
      })
    ).toStrictEqual([
      {
        position: 1,
        points: 20
      },

      {
        position: 2,
        points: 18
      }
    ])
  })

  it('should correctly update after last position removal', () => {
    expect(
      ChampionshipScoringSystemUtils.updateAfterPositionRemoval({
        scoringSystem,
        position: 3,
        reset: jest.fn(),
        setValue: jest.fn()
      })
    ).toStrictEqual([
      {
        position: 1,
        points: 25
      },

      {
        position: 2,
        points: 20
      }
    ])
  })
})
