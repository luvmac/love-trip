import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getLikes } from '@/remote/like'
import useUser from '../auth/useUser'
import { toggleLike } from '@/remote/like'
import { useAlertContext } from '@/contexts/AlertContext'
import { Hotel } from '@/models/hotel'
import { useNavigate } from 'react-router-dom'

function useLike() {
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const client = useQueryClient()

  const { data } = useQuery(
    ['likes'],
    () =>
      getLikes({
        userId: user?.uid as string,
      }),
    {
      enabled: user != null,
    },
  )
  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'> }) => {
      if (user == null) {
        throw new Error('로그인 필요')
      }
      return toggleLike({ hotel, userId: user.uid })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['likes'])
      },
      onError: (e: Error) => {
        if (e.message === '로그인 필요') {
          open({
            title: '로그인이 필요한 기능입니다.',
            onButtonClick: () => {
              navigate('/signin')
            },
          })
          return
        }
        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요',
          onButtonClick: () => {
            // 다른 액션~
          },
        })
      },
    },
  )
  return { data, mutate }
}
export default useLike
