import { useMsal } from "@azure/msal-react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
} from "@fluentui/react-components";

export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType: string) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }

    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <MenuButton>Sign Out</MenuButton>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    <MenuItem onClick={() => handleLogout("popup")}>Sign out using Popup</MenuItem>
                    <MenuItem onClick={() => handleLogout("redirect")}>Sign out using Redirect</MenuItem>
                </MenuList>
            </MenuPopover>
        </Menu>
    )
}