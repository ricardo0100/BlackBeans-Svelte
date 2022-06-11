<script>
  import Dashboard from "./pages/dashboard/Dashboard.svelte";
  import Items from "./pages/items/Items.svelte";
  import Accounts from "./pages/accounts/Accounts.svelte";
  import Categories from "./pages/categories/Categories.svelte";
  import Profile from "./pages/profile/Profile.svelte";
  import Container from "../shared/Container.svelte";
  import Menu from "./menu/Menu.svelte";
  import Footer from "../shared/Footer.svelte";

  let page = "";

  // onMount(async () => {
  //   let pathComponents = document.baseURI.split("/");
  //   page = pathComponents.pop();
  //   changePage(page);
  // });

  /**
   * @param {string} newPage
   */
  function changePage(newPage) {
    page = newPage;
    history.replaceState(newPage, "", newPage);
  }
</script>

<Menu
  selectedPage={page}
  on:pageChanged={(e) => {
    changePage(e.detail.page);
  }}
/>

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

<Footer />
