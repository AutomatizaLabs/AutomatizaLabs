## Main Page


To create the main page we create the [layout.js](../src/app/layout.js) and the [page.js](../src/app/page.js), default by the nextjs 14 (framework used on the project), and in the page.js we have an architeture based on components, as you can see here: 

``` js
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#ffffffff]">
      <Navbar /> //navbar component
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />  //components start
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection /> // components end
      </div>
      <Footer /> // footer component
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
* [Navbar]()
* [HeroSection]()
* [AchivementsSection]()
* [AboutSection](../Components/AboutSection.md)
* [ProjectsSection]()
* [EmailSection]()
* [Footer]()

[Return to Index ⏎](../Index.md)
