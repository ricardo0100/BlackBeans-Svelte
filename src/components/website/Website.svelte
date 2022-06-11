<script>
  import { onMount } from "svelte";
  import Menu from "./menu/Menu.svelte";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import About from "./pages/About.svelte";
  import Container from "../shared/Container.svelte";

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];
  let selectedPage = pages[0];

  onMount(() => {
    selectedPage = getCurrentPageFromURI();
  });

  function setURIWithPath(path) {
    history.replaceState(path, "", path);
  }

  function getCurrentPageFromURI() {
    let pathComponents = document.baseURI.split("/").filter((e) => {
      return e != "";
    });
    let path = "/" + pathComponents.pop();
    let page = pages.find((e) => {
      return e.path == path;
    });
    if (page == undefined) return pages[0];
    else return page;
  }

  function onPageSelected(page) {
    selectedPage = page;
    setURIWithPath(page.path);
  }
</script>

<Menu
  {pages}
  {selectedPage}
  on:pageChanged={(e) => {
    e.defaultPrevented;
    onPageSelected(e.detail);
  }}
/>

<Container>
  {#if selectedPage.path == "/"}
    <Home />
  {:else if selectedPage.path == "/about"}
    <About />
  {:else if selectedPage.path == "/login"}
    <Login />
  {:else if selectedPage.path == "/register"}
    <Register />
  {/if}
</Container>
