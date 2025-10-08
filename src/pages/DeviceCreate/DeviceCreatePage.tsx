import { Box, Button, Container, Flex, Heading, TextArea, TextField } from "@radix-ui/themes";
import type { FormEvent } from "react";
import { useState } from "react";

export const DeviceCreatePage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: integrate with device creation endpoint
        alert(`Create device: ${name} - ${description}`);
    };

    return (
        <Container size="2" pt="6">
            <Heading as="h2" size="7" mb="5">
                Create Device
            </Heading>
            <Box maxWidth="420px">
                <form onSubmit={handleSubmit}>
                    <Box mb="4">
                        <TextField.Root
                            placeholder="Device name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </Box>
                    <Box mb="4">
                        <TextArea
                            placeholder="Description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            rows={4}
                        />
                    </Box>
                    <Flex justify="end">
                        <Button type="submit">Create</Button>
                    </Flex>
                </form>
            </Box>
        </Container>
    );
};
