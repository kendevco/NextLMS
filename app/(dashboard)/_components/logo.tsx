import Image from "next/image"


export const Logo = () => {
    return (
        <>
        <Image
            src="/logo.svg"
            alt="Logo"
            width={130}
            height={130}
        />
        </>
    )
}