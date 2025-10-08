import "./App.css";
import "@radix-ui/themes/styles.css";

import { Box, Container, Theme, ThemePanel } from "@radix-ui/themes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DevicePage } from "./pages/Device/DevicePage";
import { DeviceCreatePage } from "./pages/DeviceCreate/DeviceCreatePage";
import { DeviceEditPage } from "./pages/DeviceEdit/DeviceEditPage";
import { DeviceListPage } from "./pages/DeviceList/DeviceListPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { Header } from "./root/header/Header";
import { RequireAuth } from "./routes/RequireAuth";
import { AppRoute } from "./routes/routes";

function App() {
    return (
        <Theme accentColor="mint" panelBackground="solid" grayColor="sand" radius="large">
            <BrowserRouter>
                <Box className="rootContainer">
                    <Container size="4">
                        <Header />
                        <Box className="appContent">
                            <Routes>
                                <Route path={AppRoute.Root} element={<Navigate to={AppRoute.Devices} replace />} />
                                <Route path={AppRoute.Login} element={<LoginPage />} />
                                <Route path={AppRoute.Devices} element={<DeviceListPage />} />
                                <Route path={AppRoute.DeviceDetails} element={<DevicePage />} />
                                <Route element={<RequireAuth />}>
                                    <Route path={AppRoute.DeviceCreate} element={<DeviceCreatePage />} />
                                    <Route path={AppRoute.DeviceEdit} element={<DeviceEditPage />} />
                                </Route>
                                <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
                            </Routes>
                        </Box>
                    </Container>
                </Box>
            </BrowserRouter>
            <ThemePanel />
        </Theme>
    );
}

export default App;
