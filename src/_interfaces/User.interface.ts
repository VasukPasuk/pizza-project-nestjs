export interface IUser {
    id: number
    login: string
    role: "ADMIN" | "CUSTOMER"
    password?: string
}