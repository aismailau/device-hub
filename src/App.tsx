import "./App.css";
import "@radix-ui/themes/styles.css";

import { Box, Container, Theme, ThemePanel } from "@radix-ui/themes";

// import { useState } from "react";
import { Signup } from "./components/Signup/Signup";
import { TableComponent } from "./components/Table/Table";

function App() {
    // const [count, setCount] = useState(0);

    return (
        <Theme accentColor="mint" grayColor="sand" radius="large" scaling="95%">
            <div className="rootContainer">
                <Box
                    width={{ md: "100vw", xl: "1400px" }}
                    height={{ md: "100vh", xl: "600px" }}
                    p={{ sm: "6", lg: "9" }}
                    >
                        <Container size="1">
                            <Box py="9">
                                <TableComponent />
                            </Box>
                            <Box py="9">
                                <Signup />
                            </Box>
                        </Container>
                </Box>
            </div>
            <ThemePanel />
        </Theme>
    );
}

export default App;
