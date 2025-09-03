interface Config {
    username: string;
}

interface ActivityData {
    "album-art": string;
    "album-artist": string;
    "album-name": string;
}

interface ListenMetadata {
    additional_info: { release_mbid: string };
    artist_name: string;
    release_name: string;
}