import { UseFormSetValue, FieldValues, UseFormReset } from 'react-hook-form'
import { _ScoringSystem } from '~store/championship-creation/championship-creation.slice'

const ChampionshipScoringSystemUtils = {
  updateAfterPositionRemoval: ({
    scoringSystem,
    position,
    setValue,
    reset
  }: {
    scoringSystem: _ScoringSystem[]
    position: number
    setValue: UseFormSetValue<FieldValues>
    reset: UseFormReset<FieldValues>
  }) => {
    reset()

    const newScoringSystem: _ScoringSystem[] = scoringSystem.reduce(
      (acc, current) => {
        if (current.position < position) {
          acc.push(current)

          setValue(current.position.toString(), current.points.toString())

          return acc
        }

        if (current.position === position) {
          return acc
        }

        if (current.position > position) {
          acc.push({ ...current, position: current.position - 1 })

          setValue((current.position - 1).toString(), current.points.toString())

          return acc
        }

        return acc
      },
      [] as _ScoringSystem[]
    )

    return newScoringSystem
  }
}

export default ChampionshipScoringSystemUtils
