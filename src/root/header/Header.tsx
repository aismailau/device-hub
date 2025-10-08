import {
    Button,
    DropdownMenu,
    Flex,
    Heading,
    Link as RadixLink,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AppRoute } from "../../routes/routes";
import { authService, type AuthUser } from "../../services/authService";

export const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<AuthUser | null>(authService.getCurrentUser());

    useEffect(() => authService.subscribe(setUser), []);

    const handleLogout = () => {
        authService.logout();
        void navigate(AppRoute.Devices);
    };

    return (
        <Flex
            asChild
            align="center"
            justify="between"
            mb="6"
        >
            <header className="appHeader">
                <RadixLink asChild>
                    <NavLink to={AppRoute.Root}>
                        <Heading as="h1" size="7">
                            Device Hub
                        </Heading>
                    </NavLink>
                </RadixLink>
                <Flex gap="4" align="center">
                    {user ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button variant="soft">{user.email}</Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Label>Account</DropdownMenu.Label>
                                <DropdownMenu.Item onSelect={handleLogout}>
                                    Log out
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    ) : (
                        <RadixLink asChild>
                            <NavLink to={AppRoute.Login}>
                                Login
                            </NavLink>
                        </RadixLink>
                    )}
                </Flex>
            </header>
        </Flex>
    );
};
