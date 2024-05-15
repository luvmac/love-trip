import useHotels from '@/components/hotelList/hooks/useHotels'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spacing from '@/components/shared/Spacing'
import Top from '@/components/shared/Top'
import { Fragment } from 'react'
import HotelItem from '@/components/hotelList/HotelItem'
import useLike from '@/hooks/like/useLike'

function HotelListPage() {
  const { data: hotels, loadMore, hasNextPage } = useHotels()
  const { data: likesData, mutate: like } = useLike()
  console.log('likes', likesData)
  // console.log(hotels)
  return (
    <div>
      <Top title="인기호텔" subTitle="호텔부터 펜션까지 최저가" />
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="50px"
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem
                onLike={like}
                hotel={hotel}
                isLike={Boolean(
                  likesData?.find((like) => like.hotelId === hotel.id),
                )}
              />

              {hotels.length - 1 === idx ? null : (
                <Spacing
                  size={8}
                  backgroundColor="gray100"
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
export default HotelListPage
