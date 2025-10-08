import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <Container size="1" pt="6">
            <Heading as="h2" size="7" mb="3">
                Page not found
            </Heading>
            <Box>
                <Text as="p" size="3" mb="3">
                    Sorry, we couldn&apos;t find what you were looking for.
                </Text>
                <Text asChild>
                    <Link to="/devices">Return to device list</Link>
                </Text>
            </Box>
        </Container>
    );
};
