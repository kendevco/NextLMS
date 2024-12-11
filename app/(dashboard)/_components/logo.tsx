import Link  from "next/link"
import Image from "next/image"


export const Logo = () => {
    return (<>
        <Link href="/" legacyBehavior>
            <Image
            
                src="/logo.svg"
                alt="Logo"
                width={130}
                height={130}
            />
        </Link>
    </>);
}