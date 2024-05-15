import {
  getDoc,
  collection,
  getDocs,
  doc,
  orderBy,
  query,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { store } from './firebase'
import { Review } from '@/models/review'
import { User } from 'firebase/auth'

export async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)
  const reviewQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc'),
  )
  // 리뷰문서 가져오기
  const reviewSnapshot = await getDocs(reviewQuery)
  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review
  })
  // 같은 리뷰를 작성하는 유저를 다시 호출하지 않게
  // 캐싱시키기 위하여 유저맵을 하나만들기
  // 이 유저맵에 캐싱시킬것임
  const userMap: {
    [key: string]: User
  } = {}

  const results: Array<Review & { user: User }> = []
  // 리뷰 순회하기
  for (let review of reviews) {
    // 캐시된 유저 있는지 리뷰 뒤져보기
    const 캐시된유저 = userMap[review.userId]
    // 없다면 ?
    if (캐시된유저 == null) {
      // 유저의 정보를 호출해서 가져온다.
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId),
      )
      const user = userSnapshot.data() as User

      userMap[review.userId] = user
      results.push({
        ...review,
        user,
      })
    } else {
      results.push({
        ...review,
        user: 캐시된유저,
      })
    }
  }

  return results
}
// 리뷰작성
// 문서가 생성될 때 부여되는 아이디라서 문서를 작성할 때엔 아이디가 없어서 omit으로 빼줌

export function writeReview(review: Omit<Review, 'id'>) {
  // 1. 호텔 찾아주기 , 넘겨받은 리뷰가 가지고 있는 호텔의 아이디를 찾기
  const hotelRef = doc(store, COLLECTIONS.HOTEL, review.hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW))

  return setDoc(reviewRef, review)
}
export function removeReview({
  reviewId,
  hotelId,
}: {
  reviewId: string
  hotelId: string
}) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW), reviewId)

  return deleteDoc(reviewRef)
}
