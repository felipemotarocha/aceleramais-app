import React from 'react'

import { render, act, fireEvent } from '~helpers/test.helpers'

import ChampionshipsBasicInfoContainer from './basic-info.container'

describe('Championship Basic Info', () => {
  it('should show errors if trying to submit without filling all required fields', async () => {
    const { getByText, getByLabelText } = render(
      <ChampionshipsBasicInfoContainer />
    )

    const descriptionInput = getByLabelText(/descrição/i)

    const submitButton = getByText(/avançar/i)

    await act(async () => {
      fireEvent.changeText(descriptionInput, 'valid_description')
      fireEvent.press(submitButton)
    })

    expect(getByText(/o título é obrigatório./i)).toBeDefined()
    expect(getByText(/a plataforma é obrigatória./i)).toBeDefined()
  })
})
