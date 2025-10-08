import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { useParams } from "react-router-dom";

export const DevicePage = () => {
    const { deviceId } = useParams();

    return (
        <Container size="2" pt="6">
            <Heading as="h2" size="7" mb="4">
                Device Details
            </Heading>
            <Box>
                <Text as="p" size="3">
                    Device identifier: {deviceId}
                </Text>
            </Box>
        </Container>
    );
};
