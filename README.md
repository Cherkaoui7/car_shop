# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
pnpm dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
pnpm exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
pnpm exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
pnpm exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
pnpm exec turbo link
pnpm exec turbo link
```



### Terminal 1: The API Gateway

This boots up the backend and the database connection on port `5000`.

<pre><div node="[object Object]" class="relative whitespace-pre-wrap word-break-all my-2 rounded-xl bg-muted border"><div class="min-h-7 relative box-border flex flex-row items-center justify-between rounded-t border-b border-border px-2 py-0.5"><div class="font-sans text-sm text-muted-foreground">bash</div><div class="flex flex-row gap-2 justify-end"></div></div><div class="p-3"><div class="w-full h-full text-xs cursor-text"><div class="code-block"><div class="code-line" data-line-number="1" data-line-start="1" data-line-end="1"><div class="line-content"><span class="mtk16">pnpm</span><span class="mtk1"></span><span class="mtk6">--filter</span><span class="mtk1"></span><span class="mtk12">@carshop/api</span><span class="mtk1"></span><span class="mtk12">dev</span></div></div></div></div></div></div></pre>

### Terminal 2: The Next.js Web Storefront

This boots up the server-side rendered website on port `3000`.

<pre><div node="[object Object]" class="relative whitespace-pre-wrap word-break-all my-2 rounded-xl bg-muted border"><div class="min-h-7 relative box-border flex flex-row items-center justify-between rounded-t border-b border-border px-2 py-0.5"><div class="font-sans text-sm text-muted-foreground">bash</div><div class="flex flex-row gap-2 justify-end"></div></div><div class="p-3"><div class="w-full h-full text-xs cursor-text"><div class="code-block"><div class="code-line" data-line-number="1" data-line-start="1" data-line-end="1"><div class="line-content"><span class="mtk16">pnpm</span><span class="mtk1"></span><span class="mtk6">--filter</span><span class="mtk1"></span><span class="mtk12">@carshop/web</span><span class="mtk1"></span><span class="mtk12">dev</span></div></div></div></div></div></div></pre>

### Terminal 3: The Expo Mobile App

This launches the React Native Metro bundler on port `8081`.

<pre><div node="[object Object]" class="relative whitespace-pre-wrap word-break-all my-2 rounded-xl bg-muted border"><div class="min-h-7 relative box-border flex flex-row items-center justify-between rounded-t border-b border-border px-2 py-0.5"><div class="font-sans text-sm text-muted-foreground">bash</div><div class="flex flex-row gap-2 justify-end"></div></div><div class="p-3"><div class="w-full h-full text-xs cursor-text"><div class="code-block"><div class="code-line" data-line-number="1" data-line-start="1" data-line-end="1"><div class="line-content"><span class="mtk16">pnpm</span><span class="mtk1"></span><span class="mtk6">--filter</span><span class="mtk1"></span><span class="mtk12">@carshop/mobile</span><span class="mtk1"></span><span class="mtk12">dev</span></div></div></div></div></div></div></pre>

*(Optional) Terminal 4: The Database Viewer* If you ever need to manually inspect the PostgreSQL tables or clear out stuck reservations:

<pre><div node="[object Object]" class="relative whitespace-pre-wrap word-break-all my-2 rounded-xl bg-muted border"><div class="min-h-7 relative box-border flex flex-row items-center justify-between rounded-t border-b border-border px-2 py-0.5"><div class="font-sans text-sm text-muted-foreground">bash</div><div class="flex flex-row gap-2 justify-end"></div></div><div class="p-3"><div class="w-full h-full text-xs cursor-text"><div class="code-block"><div class="code-line" data-line-number="1" data-line-start="1" data-line-end="1"><div class="line-content"><span class="mtk16">pnpm</span><span class="mtk1"></span><span class="mtk6">--filter</span><span class="mtk1"></span><span class="mtk12">@carshop/db</span><span class="mtk1"></span><span class="mtk12">exec</span><span class="mtk1"></span><span class="mtk12">prisma</span><span class="mtk1"></span><span class="mtk12">studio</span></div></div></div></div></div></div></pre>

### 🚨 Pro-Tip for Zombie Ports

If you ever press `Ctrl+C` and the port gets stuck again, don't waste time trying to figure out which process is hung. Just drop this nuclear command into PowerShell to instantly free all your ports:

<pre><div node="[object Object]" class="relative whitespace-pre-wrap word-break-all my-2 rounded-xl bg-muted border"><div class="min-h-7 relative box-border flex flex-row items-center justify-between rounded-t border-b border-border px-2 py-0.5"><div class="font-sans text-sm text-muted-foreground">powershell</div><div class="flex flex-row gap-2 justify-end"></div></div><div class="p-3"><div class="w-full h-full text-xs cursor-text"><div class="code-block"><div class="code-line" data-line-number="1" data-line-start="1" data-line-end="1"><div class="line-content"><span class="mtk16">Stop-Process</span><span class="mtk1"></span><span class="mtk3">-</span><span class="mtk1">Name node </span><span class="mtk3">-</span><span class="mtk1">Force</span></div></div></div></div></div></div></pre>



## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
