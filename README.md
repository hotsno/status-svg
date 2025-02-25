# status-svg

🏷️ Utilize Lanyard to display your Discord Presence information on your GitHub/AniList/other profiles

## Usage

> [!NOTE]  
> Must be in and sharing "Activity status" with the Lanyard [Discord server](https://discord.com/invite/WScAm7vNGF).

For GitHub, in a `.md` file, include the following, replacing `:id` with your Discord user ID:

```md
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://status-svg.vercel.app/api/:id">
  <img src="https://status-svg.vercel.app/api/:id?lightMode=true">
</picture>
```

For other services, figure out how to display an image and use the same URL.

It should display something similar to the following (I am using my Discord user ID as an example):

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://status-svg.vercel.app/api/707743097488146524?leftAlign=true">
  <img src="https://status-svg.vercel.app/api/707743097488146524?leftAlign=true&lightMode=true">
</picture>

> [!NOTE]  
> There is special handling for this [Plex presence](https://github.com/phin05/discord-rich-presence-plex)

## Options

There are a few options to customize this display using query parameters:

### ___Left align___

Append the query param `leftAlign=:bool` to the end of the URL, replacing `:bool` with either `true` or `false`. Default is `false`.

### ___Light mode___

Append the query param `lightMode=:bool` to the end of the URL, replacing `:bool` with either `true` or `false`. Default is `false`. Light mode will make the text dark to be readable in light mode, and vice-versa.

### ___Color___

Append the query param `color=:hexCode` to the end of the URL, replacing `:hexCode` with a color hex code (don't include the `#`). This will override the light mode option.

## Credits
- [Lanyard](https://github.com/Phineas/lanyard)
- [lanyard-profile-readme](https://github.com/cnrad/lanyard-profile-readme) (used as a starting point)
