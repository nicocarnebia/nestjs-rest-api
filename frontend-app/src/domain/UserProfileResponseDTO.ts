interface UserProfileResponse {
    id: number,
    name: string,
    address: {
        street:string,
        city:string,
        country:string,
    }
}
export default UserProfileResponse;
