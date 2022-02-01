import styled from 'styled-components/native'
import Colors from '~constants/colors.constants'

type ImagePickerButtonProps = {
  showBackground: boolean
}

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`

export const ImagePickerButton = styled.Pressable<ImagePickerButtonProps>`
  align-self: center;
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
  border-radius: 150px;
  z-index: 1;
  background-color: ${({ showBackground }) =>
    showBackground ? Colors.input.background : 'transparent'};
`
