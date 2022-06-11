<script>
  import { getUser } from "../../../util/API";
  import { createEventDispatcher, onMount } from "svelte";

  export let selectedPage = "";

  let user = {};
  let dispatch = createEventDispatcher();

  function onPageChanged(page) {
    dispatch("pageChanged", {
      page: page,
    });
  }

  onMount(async () => {
    user = await getUser();
  });

  const pages = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Items", path: "items" },
    { name: "Accounts", path: "accounts" },
    { name: "Categories", path: "categories" }
  ];
</script>

<header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3 ps-lg-3 pe-lg-3">
    <div class="container">
      <span class="text-white navbar-brand">Black Beans</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav">
          {#each pages as page}
            <li class="nav-item">
              <button
                class="btn btn-link nav-link"
                class:active={page.path == selectedPage}
                on:click={() => {
                  onPageChanged(page.path);
                }}>{page.name}</button
              >
            </li>
          {/each}
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/profile" id="dropdownMenuProfile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {user.name}
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuProfile">
              <li><a class="dropdown-item" href="/profile">Profile</a></li>
              <li><a class="dropdown-item" href="/logout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>

<style>
  .container {
    max-width: 960px;
  }
</style>