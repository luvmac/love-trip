import { Routes, Route, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import TestPage from './pages/Test'
import HotelListPage from './pages/HotelList'
import HotelPage from './pages/Hotel'

import MyPage from './pages/My'
import SigninPage from './pages/Signin'
import AuthGuard from './components/auth/AuthGuard'
import Navbar from './components/shared/Navbar'
import SettingsPage from './pages/settings'
import LikePage from './pages/settings/like'
import SchedulePage from './pages/Schedule'
import ReservationPage from './pages/Reservation'
import ReservationDone from './pages/ReservationDone'
import ReservationList from './pages/ReservationList'
function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/" element={<HotelListPage />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route
            path="/my"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/like"
            element={
              <PrivateRoute>
                <LikePage />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <SchedulePage />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/reservation"
            element={
              <PrivateRoute>
                <ReservationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation/done"
            element={
              <PrivateRoute>
                <ReservationDone />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation/list"
            element={
              <PrivateRoute>
                <ReservationList />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
