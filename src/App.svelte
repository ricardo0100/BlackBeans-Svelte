<script>
  import SignIn from "./lib/SignIn.svelte";
  import SignUp from "./lib/SignUp.svelte";

  let showLogin = false;
</script>

{#if showLogin}
  <SignIn on:showSignUp={() => { showLogin = false }} />
{:else}
  <SignUp on:showSignIn={() => { showLogin = true }} />
{/if}
