import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'

// Components
import CustomBottomModal from '~components/common/custom-bottom-modal/custom-bottom-modal.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import Colors from '~constants/colors.constants'

interface UserProfileOptionsModalProps {
  isVisible: boolean
  handleSignOutPress: () => void
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  handleEditProfilePress: () => void
}

const UserProfileOptionsModal: FunctionComponent<
  UserProfileOptionsModalProps
> = ({
  isVisible,
  setIsVisible,
  handleSignOutPress,
  handleEditProfilePress
}) => {
  return (
    <CustomBottomModal
      header="Opções"
      isVisible={isVisible}
      setIsVisible={setIsVisible}>
      <View style={{ width: '100%' }}>
        <Pressable
          style={[styles.item, { marginBottom: 15 }]}
          onPress={handleEditProfilePress}>
          <Feather name="edit" size={28} color={Colors.input.placeholder} />
          <TextSemiBold style={{ marginLeft: 5, fontSize: 12 }}>
            Editar perfil
          </TextSemiBold>
        </Pressable>

        <View style={styles.line}></View>

        <Pressable
          style={[styles.item, { marginTop: 15 }]}
          onPress={handleSignOutPress}>
          <Feather name="log-out" size={28} color={Colors.input.placeholder} />
          <TextSemiBold style={{ marginLeft: 5, fontSize: 12 }}>
            Fazer logout
          </TextSemiBold>
        </Pressable>
      </View>
    </CustomBottomModal>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#3B3B3B'
  }
})

export default UserProfileOptionsModal
