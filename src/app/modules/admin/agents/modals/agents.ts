export class NewAgents {
    firstName: string
    lastName: string
    email: string
    title: string
    phoneNumber: number
    mobileNumber: number
    address: string
    timeformat: string
    language: string
    level: string
}

export interface Country {
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    numericCode: string;
    callingCode: string;
  }