import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Image } from 'react-native'

// Components
import Header from '~components/common/header/header.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import ScrollViewWithPullRefresh from '~components/common/scrollview-with-pull-refresh/scrollview-with-pull-refresh.component'

// Utilities
import User from '~types/user.types'
import Colors from '~constants/colors.constants'
import { useRoute } from '@react-navigation/native'
import { UserProfileScreenRouteProp } from '~navigators/app/my-profile/my-profile.navigator.types'

interface UserProfileScreenProps {
  userProfile: User | undefined
  refreshing: boolean
  refetch: () => void
  // eslint-disable-next-line no-undef
  renderOptionsButton: () => JSX.Element
}

const UserProfileScreen: FunctionComponent<UserProfileScreenProps> = ({
  userProfile,
  refreshing,
  refetch,
  renderOptionsButton
}) => {
  const { params } = useRoute<UserProfileScreenRouteProp>()

  return (
    <View style={styles.container}>
      <Header showBack={params.showBack} renderRight={renderOptionsButton()}>
        Perfil do Piloto
      </Header>
      <ScrollViewWithPullRefresh
        style={styles.content}
        refetch={refetch}
        refreshing={refreshing}>
        {userProfile && (
          <>
            <View style={styles.top}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `${
                      userProfile?.profileImageUrl
                    }?${new Date().toISOString()}`
                  }}
                  style={{ flex: 1, borderRadius: 120 }}
                />
              </View>

              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TextMedium style={{ fontSize: 16 }}>
                  {userProfile?.firstName}{' '}
                  <TextSemiBold>
                    {userProfile?.lastName?.toUpperCase()}
                  </TextSemiBold>
                </TextMedium>

                <TextRegular>@{userProfile?.userName}</TextRegular>
              </View>

              <View style={styles.achievements}>
                <View style={styles.achievement}>
                  <TextMedium style={{ fontSize: 14 }}>
                    {userProfile?.wins}
                  </TextMedium>
                  <TextMedium
                    style={{ fontSize: 12, color: Colors.input.placeholder }}>
                    {userProfile?.wins! > 1 || userProfile?.wins === 0
                      ? 'VITÓRIAS'
                      : 'VITÓRIA'}
                  </TextMedium>
                </View>

                <View style={styles.achievement}>
                  <TextMedium style={{ fontSize: 14 }}>
                    {userProfile?.titles}
                  </TextMedium>
                  <TextMedium
                    style={{ fontSize: 12, color: Colors.input.placeholder }}>
                    {userProfile?.titles! > 1 || userProfile?.titles === 0
                      ? 'TÍTULOS'
                      : 'TÍTULO'}
                  </TextMedium>
                </View>

                <View style={styles.achievement}>
                  <TextMedium style={{ fontSize: 14 }}>
                    {userProfile?.podiums}
                  </TextMedium>
                  <TextMedium
                    style={{ fontSize: 12, color: Colors.input.placeholder }}>
                    {userProfile?.podiums! > 1 || userProfile?.podiums === 0
                      ? 'PÓDIOS'
                      : 'PÓDIO'}
                  </TextMedium>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <TextSemiBold style={{ fontSize: 14 }}>Sobre</TextSemiBold>
              <TextRegular style={{ lineHeight: 25, fontSize: 12 }}>
                {userProfile?.biography}
              </TextRegular>

              <CustomButton variant="outlined" style={{ marginTop: 20 }}>
                Ver Campeonatos
              </CustomButton>
            </View>
          </>
        )}
      </ScrollViewWithPullRefresh>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  content: {
    flex: 1,
    padding: 20
  },
  top: {
    width: '100%',
    alignItems: 'center',
    textAlign: 'center'
  },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20
  },
  achievement: {
    flex: 1,
    alignItems: 'center'
  },
  imageContainer: {
    elevation: 3,
    width: 120,
    height: 120,
    borderRadius: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22
  }
})

export default UserProfileScreen
