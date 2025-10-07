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
                <Container size="1">
                    <Box pt="5">
                        <TableComponent />
                    </Box>
                    <Box pt="5">
                        <Signup />
                    </Box>
                </Container>
            </div>
            <ThemePanel />
        </Theme>
    );
}

export default App;
