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
  <div class="container text-center">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />
      <div class="buttons">
        <button
          class="btn btn-lg btn-link btn-block float-start"
          type="button"
          on:click={showSignUp}>Sign up</button
        >

        <button class="btn btn-lg btn-primary btn-block float-end" type="button"
          >Sign in</button
        >
      </div>
    </form>
  </div>
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
