<script>
  import { onMount } from "svelte";
  import Dashboard from "./lib/pages/Dashboard/Dashboard.svelte";
  import Items from "./lib/pages/Items/Items.svelte";
  import Accounts from "./lib/pages/Accounts/Accounts.svelte";
  import Categories from "./lib/pages/Categories/Categories.svelte";
  import Profile from "./lib/pages/Profile/Profile.svelte";
  import Container from "./lib/pages/Container/Container.svelte";
  import Menu from "./lib/pages/Container/Menu.svelte";

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
