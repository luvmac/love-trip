import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { Reservation } from '@/models/reservation'
import { COLLECTIONS } from '@/constants'
import { store } from './firebase'
import { Room } from '@/models/room'
import { getHotel } from './hotel'
export async function makeReservation(newReservation: Reservation) {
  //호텔 객실 숫자 가져오기
  //잔여객수가 하나 줄어들어야하니까
  // 매진이 된 상품이면 예약 못하게 하기 위함
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )
  const room = roomSnapshot.data() as Room
  const 지금잔여객실수 = room.avaliableCount

  if (지금잔여객실수 === 0) {
    throw new Error('no room')
  }
  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      avaliableCount: 지금잔여객실수 - 1,
    }),
    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}

//예약목록 뿌리기 ~~!
// 유저가 등록한 모든 정보 뿌리기
export async function getReservations({ userId }: { userId: string }) {
  const reservationQuery = query(
    collection(store, COLLECTIONS.RESERVATION),
    where('userId', '==', userId),
  )
  // 예약정보랑 예약정보 안에있는 호텔정보를 통해서 호텔에대한 정보를 가져와서 합쳐줄거에요
  const result = []
  const reservationSnapshot = await getDocs(reservationQuery)
  for (const reservationDoc of reservationSnapshot.docs) {
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    }
    const hotel = await getHotel(reservation.hotelId)

    result.push({
      reservation,
      hotel,
    })
  }
  return result
}
