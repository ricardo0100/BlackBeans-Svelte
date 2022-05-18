<script>
    import Accounts from "./lib/Accounts.svelte";
    import { onMount } from "svelte";
    import { getUser } from "./lib/API";

    let user = {};

    onMount(async () => {
        user = getUser();
    });
</script>

<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div class="container">
            <a class="navbar-brand text-white" href="/"><i style="font-size: 1em;" class="bi bi-bank me-3 pb-3" />Black Beans</a>
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
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/">Items</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/">Accounts</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/">Categories</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {user.name}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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

<Accounts />
