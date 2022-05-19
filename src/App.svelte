<script>
  import { onMount } from "svelte";
  import { getUser } from "./lib/API";

  import Home from "./lib/pages/Home.svelte";
  import Items from "./lib/pages/Items.svelte";
  import Accounts from "./lib/pages/Accounts.svelte";
  import Categories from "./lib/pages/Categories.svelte";
  import Profile from "./lib/pages/Profile.svelte";

  let user = {};

  onMount(async () => {
    user = await getUser();
  });

  let pathComponents = document.baseURI.split("/");
  let page = pathComponents.pop();

  /**
   * @param {string} newPage
   */
  function changePage(newPage) {
    page = newPage;
    console.log(newPage);
    history.replaceState(newPage, "", newPage);
    const activeLinks = document.querySelectorAll(".nav-link, .active");
    activeLinks.forEach((element) => {
      element.classList.remove("active");
    });

    document.getElementById(newPage + "-link").classList.add("active");
  }
</script>

<header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
    <div class="container">
      <h5 class="text-white mt-2 me-4">Black Beans</h5>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button
              id="home-link"
              class="btn btn-link nav-link"
              on:click={() => {
                changePage("home");
              }}>Home</button
            >
          </li>
          <li class="nav-item">
            <button
              id="items-link"
              class="btn btn-link nav-link"
              on:click={() => {
                changePage("items");
              }}>Items</button
            >
          </li>
          <li class="nav-item">
            <button
              id="accounts-link"
              class="btn btn-link nav-link"
              on:click={() => {
                changePage("accounts");
              }}>Accounts</button
            >
          </li>
          <li class="nav-item">
            <button
              id="categories-link"
              class="btn btn-link nav-link"
              on:click={() => {
                changePage("categories");
              }}>Categories</button
            >
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {user.name}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <button
                  class="btn btn-link dropdown-item"
                  on:click={() => {
                    changePage("profile");
                  }}>Profile</button
                >
              </li>
              <li>
                <a class="dropdown-item" href="/logout">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>

{#if page == "accounts"}
  <Accounts />
{:else if page == "items"}
  <Items />
{:else if page == "categories"}
  <Categories />
{:else if page == "profile"}
  <Profile />
{:else if page == "home"}
  <Home />
{/if}
