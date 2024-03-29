import * as React from 'react'

import ChampionshipDriverSelectionContainer from './driver-selection.container'

import { render, waitFor, fireEvent, cleanup } from '~helpers/test.helpers'
import { ChampionshipCreationSliceInitialState } from '~store/championship-creation/championship-creation.slice'
import mockAxios from 'jest-mock-axios'

describe('Championship Driver Selection', () => {
  const initialState: {
    championshipCreation: ChampionshipCreationSliceInitialState
  } = {
    championshipCreation: {
      basicInfo: undefined,
      tracks: [],
      races: [],
      drivers: [],
      teams: [
        {
          id: '1',
          color: 'red',
          name: 'Ferrari'
        }
      ],

      scoringSystem: [],
      bonifications: [],
      penalties: [],
      isEdit: false,
      loading: false
    }
  }

  afterEach(() => {
    mockAxios.reset()
    cleanup()
  })

  it('should render the initial screen (no teams selected)', async () => {
    const { getByText, getByPlaceholderText, queryByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />
    )

    getByPlaceholderText(/nome e sobrenome/i)
    getByText(/piloto possui conta no acelera+/i)
    getByText(/adicionar/i)

    getByText(/pular/i)

    await waitFor(async () => expect(queryByPlaceholderText('Time')).toBeNull())
  })

  it('should render the initial screen (with teams selected)', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />,
      { preloadedState: initialState }
    )

    getByPlaceholderText(/nome e sobrenome/i)
    getByText(/piloto possui conta no acelera+/i)
    getByText(/adicionar/i)
    getByText(/pular/i)

    await waitFor(async () => getByPlaceholderText('Time'))
  })

  it('should change input if driver has an account', async () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />,
      { preloadedState: initialState }
    )

    fireEvent.press(getByLabelText(/piloto possui conta no acelera+?/i))

    await waitFor(async () => getByPlaceholderText('Nome de usuário'))
  })

  it('should show an error if trying to add a driver without providing a name', async () => {
    const { getByText } = render(<ChampionshipDriverSelectionContainer />)

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(async () => getByText(/o nome e sobrenome são obrigatórios/i))
  })

  it('should show an error if trying to add a driver without providing an user name', async () => {
    const { getByText, getByLabelText } = render(
      <ChampionshipDriverSelectionContainer />
    )

    fireEvent.press(getByLabelText(/piloto possui conta no acelera+?/i))

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(async () => getByText(/nome de usuário é obrigatório/i))
  })

  it('should add a Team to a Driver', async () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <ChampionshipDriverSelectionContainer />,
      { preloadedState: initialState }
    )

    await waitFor(async () => getByPlaceholderText('Time'))

    fireEvent.press(getByPlaceholderText('Time'))

    await waitFor(async () => getByText(/ferrari/i))

    fireEvent.press(getByText(/ferrari/i))

    await waitFor(async () => getByDisplayValue(/ferrari/i))
  })

  it('should add a Driver with a Team (not registered)', async () => {
    const {
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
      getByLabelText
    } = render(<ChampionshipDriverSelectionContainer />, {
      preloadedState: initialState
    })

    await waitFor(async () => getByPlaceholderText('Time'))

    fireEvent.press(getByPlaceholderText('Time'))

    await waitFor(async () => getByText(/ferrari/i))

    fireEvent.press(getByText(/ferrari/i))

    await waitFor(async () => getByDisplayValue(/ferrari/i))

    fireEvent.changeText(
      getByPlaceholderText(/nome e sobrenome/i),
      'Felipe Rocha'
    )

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(async () => getByLabelText(/remove felipe/i))
  })

  it('should add a Driver without a Team (not registered)', async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <ChampionshipDriverSelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    fireEvent.changeText(
      getByPlaceholderText(/nome e sobrenome/i),
      'Felipe Rocha'
    )

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(async () => getByLabelText(/remove felipe/i))
  })

  it('should edit an unregistered driver (with Teams available)', async () => {
    const { getByText, queryAllByText, queryAllByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />,
      {
        preloadedState: {
          championshipCreation: {
            ...initialState.championshipCreation,
            drivers: [
              {
                id: '1',
                firstName: 'Max',
                lastName: 'Verstappen',
                isRegistered: false
              }
            ]
          }
        }
      }
    )

    await waitFor(async () => {
      expect(queryAllByText(/max/i)).toHaveLength(2)
      expect(queryAllByText(/verstappen/i)).toHaveLength(2)
    })

    fireEvent(queryAllByText(/verstappen/i)[1], 'onLongPress')

    await waitFor(async () => {
      getByText(/editar piloto/i)
    })

    expect(queryAllByPlaceholderText(/time/i)).toHaveLength(4)
  })

  it('should edit an unregistered driver (with no Teams available)', async () => {
    const { getByText, queryAllByText, queryAllByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />,
      {
        preloadedState: {
          championshipCreation: {
            ...initialState.championshipCreation,
            drivers: [
              {
                id: '1',
                firstName: 'Max',
                lastName: 'Verstappen',
                isRegistered: false
              }
            ],
            teams: []
          }
        }
      }
    )

    await waitFor(async () => {
      expect(queryAllByText(/max/i)).toHaveLength(2)
      expect(queryAllByText(/verstappen/i)).toHaveLength(2)
    })

    fireEvent(queryAllByText(/verstappen/i)[1], 'onLongPress')

    await waitFor(async () => {
      getByText(/editar piloto/i)
    })

    expect(queryAllByPlaceholderText(/time/i)).toHaveLength(2)
  })

  it('should edit a registered driver (with Teams available)', async () => {
    const { getByText, queryAllByText, queryAllByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />,
      {
        preloadedState: {
          championshipCreation: {
            ...initialState.championshipCreation,
            drivers: [
              {
                id: '1',
                userName: 'felipe.rocha',
                firstName: 'Felipe',
                lastName: 'Rocha',
                isRegistered: true
              }
            ]
          }
        }
      }
    )

    await waitFor(async () => {
      expect(queryAllByText(/felipe/i)).toHaveLength(4)
      expect(queryAllByText(/rocha/i)).toHaveLength(4)
    })

    fireEvent(queryAllByText(/rocha/i)[1], 'onLongPress')

    await waitFor(async () => {
      getByText(/editar piloto/i)
    })

    expect(queryAllByPlaceholderText(/time/i)).toHaveLength(4)
    expect(queryAllByPlaceholderText(/nome de usuário/i)).toHaveLength(0)
    expect(queryAllByPlaceholderText(/nome e sobrenome/i)).toHaveLength(1)
  })

  it('should edit a registered driver (with no Teams available)', async () => {
    const { getByText, queryAllByText, queryAllByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />,
      {
        preloadedState: {
          championshipCreation: {
            ...initialState.championshipCreation,
            drivers: [
              {
                id: '1',
                userName: 'felipe.rocha',
                firstName: 'Felipe',
                lastName: 'Rocha',
                isRegistered: true
              }
            ],
            teams: []
          }
        }
      }
    )

    await waitFor(async () => {
      expect(queryAllByText(/felipe/i)).toHaveLength(4)
      expect(queryAllByText(/rocha/i)).toHaveLength(4)
    })

    fireEvent(queryAllByText(/rocha/i)[1], 'onLongPress')

    await waitFor(async () => {
      getByText(/editar piloto/i)
    })

    expect(queryAllByPlaceholderText(/time/i)).toHaveLength(2)
    expect(queryAllByPlaceholderText(/nome de usuário/i)).toHaveLength(0)
    expect(queryAllByPlaceholderText(/nome e sobrenome/i)).toHaveLength(1)
  })

  it('should remove a Driver', async () => {
    const {
      getByText,
      getByPlaceholderText,
      getByLabelText,
      queryByLabelText
    } = render(<ChampionshipDriverSelectionContainer />, {
      preloadedState: initialState
    })

    fireEvent.changeText(
      getByPlaceholderText(/nome e sobrenome/i),
      'Felipe Rocha'
    )

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(async () => getByLabelText(/remove felipe/i))

    fireEvent.press(getByLabelText(/remove felipe/i))

    expect(queryByLabelText(/remove felipe/i)).toBeNull()
  })

  it('should show an error when trying to add a Driver that was already added', async () => {
    const {
      getByPlaceholderText,
      getByLabelText,
      getByText,
      getByDisplayValue,
      queryAllByLabelText
    } = render(<ChampionshipDriverSelectionContainer />, {
      preloadedState: {
        championshipCreation: {
          ...initialState,
          drivers: [
            {
              id: '1',
              userName: 'valid_user_name',
              isRegistered: true
            }
          ],
          teams: []
        }
      }
    })

    fireEvent.press(getByLabelText(/piloto possui conta no acelera+?/i))

    await waitFor(async () => getByPlaceholderText(/nome de usuário/i))

    fireEvent.changeText(
      getByPlaceholderText(/nome de usuário/i),
      'valid_user_name'
    )

    await waitFor(async () => getByDisplayValue(/valid_user_name/i))

    fireEvent.press(getByText(/adicionar/i))

    expect(queryAllByLabelText(/remove/i)).toHaveLength(1)
  })
})
