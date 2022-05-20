<script>
  import { getUser } from "../../API";
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
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
    <div class="container">
      <h5 class="text-white me-4 mt-2">Black Beans</h5>
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

          {#each pages as page}
          <li class="nav-item">
            <button
              class="btn btn-link nav-link"
              class:active="{page.path == selectedPage}"
              on:click={() => {
                onPageChanged(page.path);
              }}>{page.name}</button
            >
          </li>  
          {/each}
          
          
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {user.name}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <button
                  class="btn btn-link dropdown-item"
                  on:click={() => {
                    onPageChanged("profile");
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
