import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'

import { useCallback } from 'react'

import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import useUser from '@/hooks/auth/useUser'

import Text from './Text'
import Spacing from './Spacing'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  // @TODO
  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <>
          <Flex align="center">
            <Text typography="t6">{user.displayName}</Text>
            <Spacing size={20} direction="horizontal" />

            <Link to="/my" css={myStyle}>
              <img
                src={
                  user.photoURL ??
                  'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
                }
                alt="유저의 이미지"
                width={40}
                height={40}
                style={{ borderRadius: '100%' }}
              />
            </Link>

            <Spacing size={20} direction="horizontal" />
            <Link to="/settings">
              <img
                src="https://cdn3.iconfinder.com/data/icons/feather-5/24/settings-128.png"
                height={20}
                width={20}
                alt="settingImage"
              />
            </Link>
          </Flex>
        </>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">Love trip</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`

const myStyle = css`
  border: 3px solid ${colors.gray400};
  border-radius: 100%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`
export default Navbar
