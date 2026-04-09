import MainMenu from '@/components/main-menu';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainMenu />
      {children}
    </>
  );
}
