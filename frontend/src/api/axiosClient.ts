'use client'

import type {AxiosRequestConfig} from 'axios';
import axios from 'axios';
import {isNil} from 'lodash-es';
import axiosInstance from "@/lib/axiosInstance";

export const customInstance=async <T> (config : AxiosRequestConfig) => {

    try{
        const response  =await axiosInstance(config);
        return response.data as T;
    } catch(error: any){
        if(axios.isAxiosError(error) && !isNil(error.response)){

            const contentType=error.response.headers['content-type'];

            let {data} = error.response;

            if(contentType.includes("application/json")){
                const textDecoder=new TextDecoder();
                const text=textDecoder.decode(data);
                data=JSON.parse(text);
            }
            error.response.data =data;
        }

        throw error;
    }

}


