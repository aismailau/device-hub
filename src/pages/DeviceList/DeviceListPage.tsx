import { Box, Container, Heading } from "@radix-ui/themes";

import { TableComponent } from "../../components/Table/Table";

export const DeviceListPage = () => {
    return (
        <Container size="3" pt="6">
            <Box mb="5">
                <Heading as="h2" size="7">
                    Devices
                </Heading>
            </Box>
            <TableComponent />
        </Container>
    );
};
