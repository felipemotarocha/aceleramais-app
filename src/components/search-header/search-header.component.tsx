import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'

// Components
import TextBold from '~components/common/text-bold/text-bold.component'
import CustomInput from '~components/common/custom-input/custom-input.component'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { useAppDispatch } from '~store'
import { submitSearch } from '~store/search/search.actions'
import { updateSearchText } from '~store/search/search.slice'

interface SearchHeaderProps {}

type SearchForm = { searchText: string }

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  const { control, handleSubmit: _handleSubmit } = useForm<SearchForm>()

  const insets = useSafeAreaInsets()

  const dispatch = useAppDispatch()

  const handleSubmit = (data: SearchForm) => {
    // TODO: get entity from redux
    const isCode = data.searchText[0] === '#'

    const _searchText = isCode ? data.searchText.split('#')[1] : data.searchText

    dispatch(submitSearch(_searchText, 'championship'))
    dispatch(updateSearchText(_searchText))
  }

  return (
    <View
      style={{
        paddingTop:
          Platform.OS === 'android' ? insets.top + 10 : insets.top + 25,
        ...styles.container
      }}>
      <View>
        <TextBold style={{ fontSize: 16, marginBottom: 15 }}>
          Pesquisar
        </TextBold>

        <Controller
          name="searchText"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <CustomInput
              placeholder="Nome ou código do campeonato"
              returnKeyType="search"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={() => _handleSubmit(handleSubmit)()}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.backgroundSecondary
  }
})

export default SearchHeader
