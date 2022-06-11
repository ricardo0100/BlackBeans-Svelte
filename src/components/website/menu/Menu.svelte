<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let selectedPage = {};
  export let pages = [];

  function onPageChanged(page) {
    selectedPage = page;
    dispatch("pageChanged", page);
  }
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
                class:active={page.path == selectedPage.path}
                on:click={() => {
                  onPageChanged(page);
                }}>{page.name}</button
              >
            </li>
          {/each}
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
