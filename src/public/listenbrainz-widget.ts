let config: Config = {
    username: "janpasi"
}

function populate(data: ActivityData) {
    for (const [k, v] of Object.entries(data)) {
        const el = document.getElementById(k);
        
        if (!el)
            throw new Error(`cannot find element with id #${k}`);

        if (k === "album-art")
            (el as HTMLImageElement).src = v;
        else
            el.textContent = v;
            if (el.scrollWidth > el.clientWidth)
                el.title = v;
    }
}

async function getListen(config: Config): Promise<ListenMetadata> {
    const res = await fetch(`https://api.listenbrainz.org/1/user/${config.username}/listens`);

    if (!res.ok)
        throw new Error("Could not fetch listen history");

    const data = await res.json();

    return data.payload.listens[0].track_metadata;
}

async function parseListen(listen: ListenMetadata): Promise<ActivityData> {
    const art = await fetch(`https://coverartarchive.org/release/${listen.additional_info.release_mbid}`)
        .then(response => response.json())
        .catch(err => {
            console.error("Could not fetch cover art:", err);
        });

    return {
        "album-art": art.images[0].thumbnails.small,
        "album-artist": listen.artist_name,
        "album-name": listen.release_name,
    }
}

(async() => {
    const listen = await getListen(config);
    const activity = await parseListen(listen);
    populate(activity)
})();