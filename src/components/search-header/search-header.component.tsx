import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'

// Components
import TextBold from '~components/common/text-bold/text-bold.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { useAppDispatch } from '~store'
import { submitSearch } from '~store/search/search.actions'

interface SearchHeaderProps {}

type SearchForm = { searchText: string }

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit: _handleSubmit
  } = useForm<SearchForm>()

  const insets = useSafeAreaInsets()

  const dispatch = useAppDispatch()

  const handleSubmit = (data: SearchForm) => {
    // TODO: get entity from redux
    dispatch(submitSearch(data.searchText, 'championship'))
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
              hasError={!!errors?.searchText}
              onSubmitEditing={() => _handleSubmit(handleSubmit)()}
            />
          )}
        />

        {errors?.searchText?.type === 'required' && (
          <TextMedium
            style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
            Este campo é obrigatório.
          </TextMedium>
        )}
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
