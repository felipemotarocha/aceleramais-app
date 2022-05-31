import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Image } from 'react-native'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import { AWS_CLOUDFRONT_URL } from '~constants/config.constants'

interface ChampionshipDetailsHeaderProps {
  name: string
  platform: string
  code: string
  description?: string
  avatarImageUrl?: string
  editButtonIsToBeShown: boolean
  entryRequestButtonIsToBeShown: boolean
  entryWasRequested: boolean
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
  entryWasRequested,
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
                `https://${AWS_CLOUDFRONT_URL}/championship-avatars/default.png`
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
              style={styles.button}>
              Editar
            </CustomButton>
          )}

          {entryRequestButtonIsToBeShown && (
            <CustomButton
              onPress={handleRequestEntryPress}
              variant="primary"
              style={styles.button}>
              Solicitar Entrada
            </CustomButton>
          )}

          {entryWasRequested && (
            <CustomButton disabled variant="primary" style={styles.button}>
              Entrada Solicitada
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
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: 5
  }
})

export default ChampionshipDetailsHeader
