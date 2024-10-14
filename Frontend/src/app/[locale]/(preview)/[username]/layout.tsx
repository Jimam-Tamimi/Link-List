import Header from "@/components/Header/Header";
import getPageContent from "@/helpers/getPageContent";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let pageContent = await getPageContent('components/Header')

  return (
    <>
        <Header previewHeader pageContent={pageContent} />
        {children}
    </>
  );
}
