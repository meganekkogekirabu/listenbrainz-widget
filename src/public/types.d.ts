interface Config {
    username: string;
}

interface ActivityData {
    "album-art": string;
    "album-artist": string;
    "album-name": string;
}

interface ListenMetadata {
    artist_name: string;
    release_name: string;
    mbid_mapping: { release_mbid: string };
}