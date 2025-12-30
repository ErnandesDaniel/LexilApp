'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PropsWithChildren, useMemo} from "react";

const ApiProvider = ({children}:PropsWithChildren) => {

    const queryClient=useMemo(()=>new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                refetchOnWindowFocus: false,
                retry: false
            },
        },
    }),[]);

    return (<QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>);
}

export default ApiProvider;