import { Box, Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import type { FormEvent } from "react";
import { useState } from "react";

import { authService } from "../../services/authService";
import { ApiError } from "../../services/httpClient";

interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const normalizedEmail = email.trim();

        if (!normalizedEmail || !password) {
            setError("Email and password are required.");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setIsSuccess(false);

        try {
            await authService.login({ email: normalizedEmail, password });
            setIsSuccess(true);
            onSuccess?.();
        } catch (err) {
            const message =
                err instanceof ApiError ? err.message : "Unable to log in. Please verify your credentials.";
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card size="4">
            <form
                onSubmit={(event) => {
                    void handleSubmit(event);
                }}
                noValidate
            >
                <Heading as="h3" size="6" trim="start" mb="5">
                    Log in
                </Heading>

                {error && (
                    <Box mb="4">
                        <Text color="red" size="2">
                            {error}
                        </Text>
                    </Box>
                )}

                {isSuccess && (
                    <Box mb="4">
                        <Text color="green" size="2">
                            Logged in successfully.
                        </Text>
                    </Box>
                )}

                <Box mb="5">
                    <Flex mb="1">
                        <Text
                            as="label"
                            htmlFor="login-email-field"
                            size="2"
                            weight="bold"
                        >
                            Email address
                        </Text>
                    </Flex>
                    <TextField.Root
                        tabIndex={1}
                        placeholder="Enter your email"
                        id="login-email-field"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={isSubmitting}
                        required
                    />
                </Box>

                <Box mb="5" position="relative">
                    <Flex align="baseline" justify="between" mb="1">
                        <Text
                            as="label"
                            size="2"
                            weight="bold"
                            htmlFor="login-password-field"
                        >
                            Password
                        </Text>
                    </Flex>
                    <TextField.Root
                        tabIndex={3}
                        placeholder="Enter your password"
                        id="login-password-field"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={isSubmitting}
                        required
                    />
                </Box>

                <Flex mt="6" justify="end" gap="3">
                    <Button tabIndex={4} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </Button>
                </Flex>
            </form>
        </Card>
    );
};
