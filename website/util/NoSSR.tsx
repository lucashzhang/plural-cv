import type { FC, ReactNode } from "react";
import dynamic from "next/dynamic";

type Props = {
    children: ReactNode
}

const NoSSR: FC<Props> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
});