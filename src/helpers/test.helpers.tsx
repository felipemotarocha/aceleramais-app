// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react-native'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'

import userReducer from '~store/user/user.slice'
import championshipCreationReducer from '~store/championship-creation/championship-creation.slice'
import championshipsReducer from '~store/championships/championships.slice'
import championshipDetailsReducer from '~store/championship-details/championship-details.slice'
import championshipRacesReducer from '~store/championship-races/championship-races.slice'
import championshipDriverStandingsReducer from '~store/championship-driver-standings/championship-driver-standings.slice'
import championshipTeamStandingsReducer from '~store/championship-team-standings/championship-team-standings.slice'
import raceClassificationReducer from '~store/race-classification/race-classification.slice'
import racePenaltiesAndBonificationsReducer from '~store/race-penalties-and-bonifications/race-penalties-and-bonifications.slice'
import searchReducer from '~store/search/search.slice'
import championshipPendentDriversReducer from '~store/championship-pendent-drivers/championship-pendent-drivers.slice'

function render(
  ui,
  {
    // @ts-ignore
    preloadedState,
    store = configureStore({
      reducer: {
        user: userReducer,
        championshipCreation: championshipCreationReducer,
        championships: championshipsReducer,
        championshipDetails: championshipDetailsReducer,
        championshipRaces: championshipRacesReducer,
        championshipDriverStandings: championshipDriverStandingsReducer,
        championshipTeamStandings: championshipTeamStandingsReducer,
        raceClassification: raceClassificationReducer,
        racePenaltiesAndBonifications: racePenaltiesAndBonificationsReducer,
        championshipPendentDrivers: championshipPendentDriversReducer,
        search: searchReducer
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider
            initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
            {children}
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react-native'

export { render }
