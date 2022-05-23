<script>
  import { onMount } from "svelte";
  import Dashboard from "./lib/modules/Dashboard/Dashboard.svelte";
  import Items from "./lib/modules/Items/Items.svelte";
  import Accounts from "./lib/modules/Accounts/Accounts.svelte";
  import Categories from "./lib/modules/Categories/Categories.svelte";
  import Profile from "./lib/modules/Profile/Profile.svelte";
  import Container from "./lib/modules/Container/Container.svelte";
  import Menu from "./lib/modules/Container/Menu.svelte";
import Footer from "./lib/modules/Container/Footer.svelte";

  let page = "";

  onMount(async () => {
    let pathComponents = document.baseURI.split("/");
    page = pathComponents.pop();
    if (page == "") {
      changePage("dashboard");
    }
  });

  /**
   * @param {string} newPage
   */
  function changePage(newPage) {
    page = newPage;
    history.replaceState(newPage, "", newPage);
  }
</script>

<Menu selectedPage={page} on:pageChanged={(e) => { changePage(e.detail.page) }} />

<Container>
  {#if page == "accounts"}
    <Accounts />
  {:else if page == "items"}
    <Items />
  {:else if page == "categories"}
    <Categories />
  {:else if page == "profile"}
    <Profile />
  {:else if page == "dashboard"}
    <Dashboard />
  {/if}
</Container>

<!-- <Footer /> -->