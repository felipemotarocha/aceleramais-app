import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

// Components
import CustomBottomModal from '~components/common/custom-bottom-modal/custom-bottom-modal.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import Colors from '~constants/colors.constants'

interface UserProfileOptionsModalProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const UserProfileOptionsModal: FunctionComponent<
  UserProfileOptionsModalProps
> = ({ isVisible, setIsVisible }) => {
  return (
    <CustomBottomModal
      header="Opções"
      isVisible={isVisible}
      setIsVisible={setIsVisible}>
      <View style={{ width: '100%' }}>
        <View style={[styles.item, { marginBottom: 15 }]}>
          <Feather name="edit" size={28} color={Colors.input.placeholder} />
          <TextSemiBold style={{ marginLeft: 5, fontSize: 12 }}>
            Editar perfil
          </TextSemiBold>
        </View>

        <View style={styles.line}></View>

        <View style={[styles.item, { marginTop: 15 }]}>
          <Feather name="log-out" size={28} color={Colors.input.placeholder} />
          <TextSemiBold style={{ marginLeft: 5, fontSize: 12 }}>
            Fazer logout
          </TextSemiBold>
        </View>
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
