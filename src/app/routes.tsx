import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { GamesCatalog } from "./pages/GamesCatalog";
import { DigitalMenu } from "./pages/DigitalMenu";
import { Reservations } from "./pages/Reservations";
import { StaffLogin } from "./pages/StaffLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { KitchenModule } from "./pages/KitchenModule";
import { BarModule } from "./pages/BarModule";
import { WaiterFloorMap } from "./pages/WaiterFloorMap";
import { GamesControl } from "./pages/GamesControl";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/games",
    Component: GamesCatalog,
  },
  {
    path: "/menu",
    Component: DigitalMenu,
  },
  {
    path: "/reservations",
    Component: Reservations,
  },
  {
    path: "/staff/login",
    Component: StaffLogin,
  },
  {
    path: "/staff/admin",
    Component: AdminDashboard,
  },
  {
    path: "/staff/kitchen",
    Component: KitchenModule,
  },
  {
    path: "/staff/bar",
    Component: BarModule,
  },
  {
    path: "/staff/waiter",
    Component: WaiterFloorMap,
  },
  {
    path: "/staff/games",
    Component: GamesControl,
  },
]);
