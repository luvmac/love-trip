import { useQuery } from 'react-query'
import { getReservations } from '@/remote/reservation'
import useUser from '@/hooks/auth/useUser'

export default function useReservations() {
  const user = useUser()

  // 요 데이터들을
  const { data, isLoading } = useQuery(
    // 캐시해주기
    ['reservations', user?.uid],
    // 리모트함수 실행 유저의 아이디를 넘겨주기
    () => getReservations({ userId: user?.uid as string }),
    // 유저가 널이 아닐때만 실행하도록
    {
      enabled: user != null,
    },
  )

  // 밖으로 내보내쥬기
  return { data, isLoading }
}
