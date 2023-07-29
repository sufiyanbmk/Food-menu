export interface UserInterface {
    _id?: string;
    username:string;
    email: string;
    password: string;
    isAdmin?:boolean,
    phone?:number
  }

  export interface UserReturnInterface { 
    id: string,
    username:string,
    email:string,
    token?:string,
    isAdmin?:boolean,
  }

  export interface UpdateUser {
    username?: string;
    email?: string;
    phone?: number;
  }