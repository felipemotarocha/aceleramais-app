// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react-native'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import userReducer from '~store/user/user.slice'
import { NavigationContainer } from '@react-navigation/native'
import championshipCreationReducer from '~store/championship-creation/championship-creation.slice'
import championshipsReducer from '~store/championships/championships.slice'
import championshipDetailsReducer from '~store/championship-details/championship-details.slice'

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
        championshipDetails: championshipDetailsReducer
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
