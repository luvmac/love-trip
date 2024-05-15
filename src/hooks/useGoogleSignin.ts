import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { store } from '@remote/firebase'

import { auth } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'

function useGoogleSignin() {
  const navigate = useNavigate()
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    try {
      const { user } = await signInWithPopup(auth, provider)
      const userSnapshot = getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )
      //이미 가입한 유저
      if ((await userSnapshot).exists()) {
        navigate('/')
        //아니라면
      } else {
        const 새로운유저 = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL,
        }
        // console.log('user', user)
        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          새로운유저,
        )
        navigate('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          return
        }
      }
      throw new Error('fail to sighin')
    }
  }, [navigate])
  const signout = useCallback(() => {
    signOut(auth)
  }, [])
  return { signin, signout }
}
export default useGoogleSignin
