# status-svg

🏷️ Utilize Lanyard to display your Discord Presence information on your GitHub/AniList/etc. profiles

## Usage

First, join the Lanyard [Discord](https://discord.com/invite/WScAm7vNGF) (if you haven't already) for this to work.

For GitHub, in a `.md` file, include the following, replacing `:id` with your Discord user ID:

```md
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://status-svg.vercel.app/api/:id">
  <img alt="light" src="https://status-svg.vercel.app/api/:id?lightMode=true">
</picture>
```

For other services, figure out how to display an image and use the same URL.

It should display something similar to the following (I am using my Discord user ID as an example):

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://status-svg.vercel.app/api/707743097488146524?leftAligned=true">
  <img src="https://status-svg.vercel.app/api/asdasd?leftAligned=true?lightMode=true">
</picture>

## Options

There are a few options to customize this display using query parameters:

### ___Left aligned___

Append the query param `leftAligned=:bool` to the end of the URL, replacing `:leftAligned` with either `true` or `false`. Default is `false`.

### ___Light mode___

Append the query param `lightMode=:bool` to the end of the URL, replacing `:lightMode` with either `true` or `false`. Default is `false`. Light mode will make the text dark to be readable in light mode, and vice-versa.

## Credits
- [Lanyard](https://github.com/Phineas/lanyard)
- [lanyard-profile-readme](https://github.com/cnrad/lanyard-profile-readme) (used as a starting point)
