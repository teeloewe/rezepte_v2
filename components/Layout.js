import NavBarComp from "./NavBarComp";

export default function Layout({ children }) {
    return (
        <>
            <NavBarComp />
            <main>{children}</main>
        </>
    )
}