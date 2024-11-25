import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
} from "@fluentui/react-components";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType: string) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <MenuButton>Sign In</MenuButton>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    <MenuItem onClick={() => handleLogin("popup")}>Sign in using Popup</MenuItem>
                    <MenuItem onClick={() => handleLogin("redirect")}>Sign in using Redirect</MenuItem>
                </MenuList>
            </MenuPopover>
        </Menu>
    )
}