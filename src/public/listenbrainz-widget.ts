let config: Config = {
    username: "janpasi"
}

function getById(id: string) {
    const ret = document.getElementById(id);

    if (!ret)
        throw new Error(`cannot find #${id}`);
    else
        return ret;
}

function populate(data: ActivityData) {
    for (const [k, v] of Object.entries(data)) {
        const el = getById(k);

        if (k === "album-art")
            (el as HTMLImageElement).src = v;
        else
            el.textContent = v;
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
    return {
        "album-art": `https://coverartarchive.org/release/${listen.mbid_mapping.release_mbid}/front`,
        "album-artist": listen.artist_name,
        "album-name": listen.release_name,
    }
}

(async() => {
    const listen = await getListen(config);
    const activity = await parseListen(listen);
    populate(activity)
})();