import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Image } from 'react-native'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

interface ChampionshipDetailsHeaderProps {
  name: string
  platform: string
  code: string
  description?: string
  avatarImageUrl?: string
  editButtonIsToBeShown: boolean
  entryRequestButtonIsToBeShown: boolean
  handleEditPress: () => void
  handleRequestEntryPress: () => void
}

const ChampionshipDetailsHeader: FunctionComponent<
  ChampionshipDetailsHeaderProps
> = ({
  name,
  code,
  description,
  platform,
  avatarImageUrl,
  editButtonIsToBeShown,
  entryRequestButtonIsToBeShown,
  handleEditPress,
  handleRequestEntryPress
}) => {
  return (
    <View>
      <View style={styles.top}>
        <View style={styles.imageContainer}>
          <Image
            style={{ flex: 1, borderRadius: 100 }}
            source={{
              uri:
                avatarImageUrl ||
                'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/default.png'
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TextSemiBold style={{ fontSize: 16 }} numberOfLines={2}>
            {name}
          </TextSemiBold>

          <TextRegular style={{ fontSize: 12 }} numberOfLines={1}>
            <TextMedium style={{ fontSize: 12 }}>Código: </TextMedium>#{code}
          </TextRegular>

          <TextRegular style={{ fontSize: 12 }} numberOfLines={1}>
            <TextMedium style={{ fontSize: 12 }}>Plataforma: </TextMedium>
            {platform}
          </TextRegular>

          {editButtonIsToBeShown && (
            <CustomButton
              onPress={handleEditPress}
              variant="primary"
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                marginTop: 5
              }}>
              Editar
            </CustomButton>
          )}

          {entryRequestButtonIsToBeShown && (
            <CustomButton
              onPress={handleRequestEntryPress}
              variant="primary"
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                marginTop: 5
              }}>
              Solicitar Entrada
            </CustomButton>
          )}
        </View>
      </View>

      {description && (
        <View style={styles.bottom}>
          <TextSemiBold style={{ fontSize: 14 }} numberOfLines={1}>
            Descrição
          </TextSemiBold>

          <TextRegular style={{ fontSize: 12, marginTop: 5 }} numberOfLines={5}>
            {description}
          </TextRegular>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  imageContainer: {
    elevation: 3,
    width: 100,
    height: 100,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    marginRight: 15
  },
  bottom: {
    marginTop: 20
  }
})

export default ChampionshipDetailsHeader
