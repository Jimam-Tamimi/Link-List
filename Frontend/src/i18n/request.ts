import {notFound} from "next/navigation";
import {getRequestConfig} from 'next-intl/server';
import { locales } from "./routing";
 
// Can be imported from a shared config 
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  console.log({locale})
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: {}
  };
});