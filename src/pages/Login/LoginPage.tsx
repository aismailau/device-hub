import { Box, Container, Heading, Text } from "@radix-ui/themes";
import type { Location } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { AppRoute } from "../../routes/routes";

interface LocationState {
    from?: Location;
}

export const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const state = (location.state as LocationState | null) ?? undefined;
    const redirectPath = state?.from?.pathname ?? AppRoute.Devices;

    const handleSuccess = () => {
        void navigate(redirectPath, { replace: true });
    };

    return (
        <Container size="1" pt="6">
            <Heading as="h2" size="7" mb="5">
                Welcome Back
            </Heading>

            {state?.from && (
                <Box mb="4">
                    <Text color="gray" size="2">
                        Please log in to continue to the page you requested.
                    </Text>
                </Box>
            )}

            <Box maxWidth="360px">
                <LoginForm onSuccess={handleSuccess} />
            </Box>
        </Container>
    );
};
