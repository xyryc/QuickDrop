import CommonLayout from "./components/layout/CommonLayout"
import { Outlet } from "react-router"
function App() {
  return (
    <div>
      <CommonLayout>
        <Outlet></Outlet>
      </CommonLayout>
    </div>
  )
}
export default App
