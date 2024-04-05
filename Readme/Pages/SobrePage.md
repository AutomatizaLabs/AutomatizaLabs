## Sobre Page

To create the sobre page we create the [layout.js](../../src/app/sobre/layout.js) and the [page.js](../../src/app/sobre/page.js), default by the nextjs 14 (framework used on the project), and in the page.js we have an architeture based on components, as you can see here: 

``` js
export default function Sobre() {
  return (
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <AboutSection />
        <ProjectsSectionPortifolio />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
```
and now see the layout component, only used to render the page.js

``` js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```
## Components used in the code:
```
Click in the link to see the documentation for each component
```
* [Navbar](../Components//Navbar.md)
* [AboutSection](../Components/AboutSection.md)
* [ProjectsSectionPortifolio](../Components/ProjectsPortifolio.md)
* [EmailSection](../Components/EmailSection.md)
* [Footer](../Components/Footer.md)

[Return to Index ⏎](../Index.md)
