import { SITE } from "./config/site";
import { useRoute } from "./lib/router";
import { Home } from "./pages/Home";
import { PathsPage } from "./pages/Paths";
import { PathView } from "./pages/PathView";
import { CalendarPage } from "./pages/Calendar";
import { MePage } from "./pages/Me";
import { LeadersPage } from "./pages/Leaders";
import { AboutPage } from "./pages/About";

const NAV = [
  { href: "#/", key: "", label: "Home" },
  { href: "#/paths", key: "paths", label: "Paths" },
  { href: "#/calendar", key: "calendar", label: "Calendar" },
  { href: "#/me", key: "me", label: "Me" },
  { href: "#/leaders", key: "leaders", label: "Leaders" },
];

export function App() {
  const route = useRoute();
  const [page = "", arg] = route;
  const active = page === "path" ? "paths" : page;

  let body;
  switch (page) {
    case "":
      body = <Home />;
      break;
    case "paths":
      body = <PathsPage />;
      break;
    case "path":
      body = <PathView id={arg ?? ""} />;
      break;
    case "calendar":
      body = <CalendarPage />;
      break;
    case "me":
      body = <MePage />;
      break;
    case "leaders":
      body = <LeadersPage />;
      break;
    case "about":
      body = <AboutPage />;
      break;
    default:
      body = (
        <section>
          <h1>Page not found</h1>
          <p>
            <a href="#/">Go to the home page</a>
          </p>
        </section>
      );
  }

  return (
    <>
      {/* A plain #main link would be read as a route, so move focus by hand. */}
      <a
        className="skip"
        href="#/"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap header-row">
          <a className="brand" href="#/">
            <span className="brand-unit">{SITE.unitName}</span>
            <span className="brand-title">{SITE.title}</span>
          </a>
          <nav aria-label="Main">
            <ul className="nav">
              {NAV.map((n) => (
                <li key={n.key}>
                  <a href={n.href} aria-current={active === n.key ? "page" : undefined}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="wrap" tabIndex={-1}>
        {body}
      </main>
      <footer className="wrap site-footer">
        <p>
          Unofficial squadron training tool. Not affiliated with or endorsed by the CyberPatriot Program Office. Your
          progress is saved only in this browser. <a href="#/about">About and privacy</a>
        </p>
      </footer>
    </>
  );
}
