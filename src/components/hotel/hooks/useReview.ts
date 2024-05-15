import { getReviews, writeReview, removeReview } from '@/remote/review'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import useUser from '@/hooks/auth/useUser'
import { Review } from '@/models/review'
//hook
function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const client = useQueryClient()
  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )
  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      // 새로운 리뷰 데이터 만들기
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid,
        text,
      }
      await writeReview(newReview as Review)

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  const { mutate: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )
  return { data, isLoading, write, remove }
}
export default useReview
