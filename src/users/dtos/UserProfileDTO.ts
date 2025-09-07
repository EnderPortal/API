import { Profile } from "../profile/Profile";

/**
 * Data sent to the client
 */
export class UserProfileDTO{
    id: number;
    username: string;
    mail: string;
    rankId: number;
    profile: Profile;
}