import Button from '@shared/Button'
import { FORMS } from '@/mock/data'
import { collection, writeBatch, getDocs } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { store } from '@/remote/firebase'

function HotelFormAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))
    snapshot.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      })
    })
    await batch.commit()
    alert('폼데이터 추가 완료 ')
  }
  return <Button onClick={handleButtonClick}>form data 추가하기</Button>
}
export default HotelFormAddButton
