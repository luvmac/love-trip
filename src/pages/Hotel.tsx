import { useParams } from 'react-router-dom'
import useHotel from '@/components/hotel/hooks/useHotel'
import Top from '@/components/shared/Top'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'
import Rooms from '@/components/hotel/Rooms'
import RecommendHotels from '@/components/hotel/RecommendHotels'
import ActionButtons from '@/components/hotel/ActionButtons'
import Review from '@/components/hotel/Review'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })
  if (data == null || isLoading) {
    return <div>Loading...</div>
  }
  const { name, comment, images, contents, recommendHotels } = data
  console.log('data', data)
  console.log('isL', isLoading)
  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <ActionButtons hotel={data} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <RecommendHotels recommendHotels={recommendHotels} />
      <Review hotelId={id} />
    </div>
  )
}
export default HotelPage
