import * as React from 'react'
import Colors from '~constants/colors.constants'

import { render, waitFor, fireEvent } from '~helpers/test.helpers'
import ChampionshipsHeader from './championships-header.component'

describe('Championship Header', () => {
  it('should correctly press the filter buttons', async () => {
    const { getByLabelText } = render(<ChampionshipsHeader />)

    await waitFor(async () => getByLabelText(/criados por você/i))
    await waitFor(async () => getByLabelText(/finalizados/i))

    await fireEvent.press(getByLabelText(/criados por você/i))

    expect(getByLabelText(/criados por você/i)).toHaveStyle({
      backgroundColor: Colors.primary
    })

    expect(getByLabelText(/finalizados/i)).not.toHaveStyle({
      backgroundColor: Colors.primary
    })

    await fireEvent.press(getByLabelText(/finalizados/i))

    expect(getByLabelText(/criados por você/i)).not.toHaveStyle({
      backgroundColor: Colors.primary
    })

    expect(getByLabelText(/finalizados/i)).toHaveStyle({
      backgroundColor: Colors.primary
    })
  })
})
