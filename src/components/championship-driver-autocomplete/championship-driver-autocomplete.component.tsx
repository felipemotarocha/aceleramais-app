import * as React from 'react'
import { useCallback, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

import {
  StyleSheet,
  TextInputProps,
  Pressable,
  View,
  Image
} from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'

import User from '~types/user.types'
import Colors from '~constants/colors.constants'
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import api from '~api/axios.api'

interface ChampionshipDriverAutocompleteProps extends TextInputProps {
  hasError?: boolean
}

const ChampionshipDriverAutocomplete: React.FunctionComponent<
  ChampionshipDriverAutocompleteProps
> = ({ hasError, ...rest }) => {
  const [value, setValue] = useState('')
  const [drivers, setDrivers] = useState<User[]>([])
  const [isDisabled, setIsDisabled] = useState(false)

  const handleChange = useCallback(async (query: string) => {
    setValue(query)

    if (query.length < 3) return setDrivers([])

    const { data } = await api.get(
      `/api/user/all?userName=${query.toLowerCase()}`
    )

    setDrivers(data.slice(0, 6))
  }, [])

  const onPress = useCallback((item: User) => {
    setIsDisabled(true)
    setValue(item.userName)
    setDrivers([])
  }, [])

  const onRemovePress = useCallback(() => {
    setValue('')
    setIsDisabled(false)
  }, [])

  const renderItem = useCallback(
    (item: User) => (
      <Pressable style={styles.itemContainer} onPress={() => onPress(item)}>
        <View style={styles.itemLeft}>
          <View style={styles.imageContainer}>
            <Image
              style={{ flex: 1, borderRadius: 45 }}
              source={{
                uri:
                  item?.profileImageUrl ||
                  'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/default.png'
              }}
            />
          </View>
          <View>
            <TextMedium style={{ fontSize: 12 }}>
              {item.firstName}{' '}
              <TextSemiBold style={{ fontSize: 12 }}>
                {item.lastName}
              </TextSemiBold>
            </TextMedium>

            <TextRegular style={{ fontSize: 10 }}>{item.userName}</TextRegular>
          </View>
        </View>
      </Pressable>
    ),
    []
  )

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#000000'
      }}>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          style={[
            styles.base,
            styles.normal,
            !rest.value && styles.placeholder
          ]}
          inputContainerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.input.background
          }}
          placeholder="Nome"
          data={drivers}
          value={value}
          onChangeText={handleChange}
          flatListProps={{
            style: styles.list,
            renderItem: ({ item }) => renderItem(item)
          }}
          placeholderTextColor={hasError ? Colors.error : Colors.textSecondary}
          selectionColor={Colors.primary}
          editable={!isDisabled}
          hideResults={isDisabled}
          {...rest}
        />
      </View>

      <AntDesign
        onPress={onRemovePress}
        name="close"
        size={24}
        color={Colors.textSecondary}
        style={{
          marginLeft: 10,
          position: 'absolute',
          top: 0,
          right: 0,
          paddingTop: 15
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.input.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.input.background
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    width: '90%'
  },
  placeholder: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12
  },
  normal: {
    color: Colors.textSecondary
  },
  list: {
    backgroundColor: Colors.input.background,
    width: '100%',
    borderWidth: 0,
    marginHorizontal: 0,
    marginTop: 5,
    borderRadius: 10,
    paddingTop: 15,
    paddingHorizontal: 15
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  imageContainer: {
    elevation: 3,
    width: 45,
    height: 45,
    borderRadius: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    marginRight: 10
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ChampionshipDriverAutocomplete
