export interface SpotifyUser {
    country: string,
    display_name: string,
    email: string,
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: {
        spotify: string
    },
    followers: {
        href: string,
        total: 0
    },
    href: string,
    id: string,
    images: [
        {
            url: string,
            height: number,
            width: number
        }
    ],
    product: string,
    type: string,
    uri: string
}