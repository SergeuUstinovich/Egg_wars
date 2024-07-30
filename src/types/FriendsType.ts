export interface FriendsType {
    name: string
    lvl: number
    person_id: number
    referral_system_id: number
}

export interface FriendsScheme {
    friends?: FriendsType
}