<script>
  import { loginUser } from "../../../util/api";
  let email = "";
  let password = "";

  function onSignInClicked() {
    try {
      let res = loginUser(email, password);
    } catch {}
  }
</script>

<main class="form-signin w-100 m-auto text-center">
  <form>
    <span class="material-icons" style="font-size: 4em;">account_balance</span>
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input bind:value={email} type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input bind:value={password} type="password" class="form-control" id="floatingPassword" placeholder="Password" />
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me" /> Remember me
      </label>
    </div>
    <button
      class="w-100 btn btn-lg btn-primary"
      type="button"
      on:click={() => {
        onSignInClicked();
      }}>Sign in</button
    >
  </form>
</main>

<style>
  .form-signin {
    max-width: 330px;
    padding: 15px;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
