<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function showSignUp() {
    dispatch("showSignUp");
  }
</script>

<header>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">
        <i style="margin-right: 10px;" class="bi-robot" />
        Black Beans
      </a>
    </div>
  </nav>
</header>

<main>
  <h1>Accounts</h1>
</main>

<style>
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin input {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 16px;
  }
</style>
