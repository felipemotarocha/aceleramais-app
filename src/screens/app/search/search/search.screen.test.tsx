import * as React from 'react'
import { render } from '~helpers/test.helpers'
import SearchScreen from './search.screen'

describe('Search Screen', () => {
  it('should render initial screen', async () => {
    const { getByText, getByPlaceholderText } = render(<SearchScreen />)

    getByText(/pesquisar/i)
    getByPlaceholderText(/nome ou código do campeonato/i)
    getByText(/não há campeonatos para exibir/i)
  })
})
