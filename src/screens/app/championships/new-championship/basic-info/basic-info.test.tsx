import React from 'react'

import { render, fireEvent, waitFor } from '~helpers/test.helpers'

import ChampionshipsBasicInfoContainer from './basic-info.container'

describe('Championship Basic Info', () => {
  it('should show errors if trying to submit without filling all required fields', async () => {
    const { getByText, getByLabelText } = render(
      <ChampionshipsBasicInfoContainer />
    )

    const descriptionInput = getByLabelText(/descrição/i)

    fireEvent.changeText(descriptionInput, 'valid_description')

    const submitButton = getByText(/avançar/i)

    fireEvent.press(submitButton)

    await waitFor(() => getByText(/o título é obrigatório./i))
    await waitFor(() => getByText(/a plataforma é obrigatória./i))
  })
})
