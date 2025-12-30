import "@/app/reset.scss";
import "@/app/layout.scss";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import ApiProvider from "@/components/providers/api-provider";
import MockProvider from "@/components/providers/mock-provider";

import {AntdRegistry} from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
    title: "Чат с ИИ",
    description: "Чат с ИИ",
};


export default async function RootLayout({children}: PropsWithChildren) {

    return (
        <html lang="ru">

        <head>
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <link href="icon.ico" rel="icon" />
        </head>

        <body>
            <AntdRegistry>
                <ApiProvider>
                    <MockProvider>
                        {children}
                    </MockProvider>
                </ApiProvider>
            </AntdRegistry>
        </body>
        </html>
    );
}

